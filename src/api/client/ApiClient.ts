import { APIRequestContext } from '@playwright/test';
import type { Logger } from '../../logging/Logger';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiCallResult<T> = {
  url: string;
  method: HttpMethod;
  status: number;
  ok: boolean;
  headers: Record<string, string>;
  rawText: string;
  json?: T;
};

export type ApiLogMode = 'none' | 'on-failure' | 'all';

type ApiClientOptions = {
  logger?: Logger;
  logMode?: ApiLogMode;
  maxBodyChars?: number;
};

export class ApiClient {
  private readonly logger?: Logger;
  private readonly logMode: ApiLogMode;
  private readonly maxBodyChars: number;

  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
    options?: ApiClientOptions,
  ) {
    this.logger = options?.logger;
    this.logMode = options?.logMode ?? 'on-failure';
    this.maxBodyChars = options?.maxBodyChars ?? 4000;
  }

  private truncate(text: string): string {
    if (!text) return text;
    if (text.length <= this.maxBodyChars) return text;
    return `${text.slice(0, this.maxBodyChars)}...<truncated ${text.length - this.maxBodyChars} chars>`;
  }

  private redactHeaders(headers: Record<string, string>): Record<string, string> {
    const redacted: Record<string, string> = {};
    for (const [k, v] of Object.entries(headers)) {
      const key = k.toLowerCase();
      if (key.includes('authorization') || key.includes('cookie') || key.includes('set-cookie')) {
        redacted[k] = '<redacted>';
      } else {
        redacted[k] = v;
      }
    }
    return redacted;
  }

  private redactBody(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    const SENSITIVE_KEYS = new Set(['password', 'pass', 'token', 'access_token', 'refresh_token']);
    const out: any = Array.isArray(obj) ? [] : {};
    for (const [k, v] of Object.entries(obj)) {
      if (SENSITIVE_KEYS.has(k.toLowerCase())) out[k] = '<redacted>';
      else out[k] = v;
    }
    return out;
  }

  private shouldLogRequest(): boolean {
    return !!this.logger && this.logMode === 'all';
  }

  private shouldLogResponse(status: number): boolean {
    if (!this.logger) return false;
    if (this.logMode === 'all') return true;
    if (this.logMode === 'on-failure') return status >= 400;
    return false;
  }

  private buildUrl(pathOrUrl: string): string {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const base = this.baseUrl.replace(/\/+$/, '');
    const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${base}${path}`;
  }

  async call<T>(args: {
    method: HttpMethod;
    path: string;
    query?: Record<string, string | number | boolean | undefined | null>;
    headers?: Record<string, string>;
    form?: Record<string, string | number | boolean | undefined | null>;
    json?: unknown;
  }): Promise<ApiCallResult<T>> {
    const url = new URL(this.buildUrl(args.path));

    if (args.query) {
      for (const [key, value] of Object.entries(args.query)) {
        if (value === undefined || value === null) continue;
        url.searchParams.set(key, String(value));
      }
    }

    const headers: Record<string, string> = { ...(args.headers ?? {}) };

    const fetchOptions: any = {
      method: args.method,
      headers,
    };

    let requestBodyForLog: any = undefined;

    if (args.form) {
      const form = Object.fromEntries(
        Object.entries(args.form).filter(([, value]) => value !== undefined && value !== null),
      );
      fetchOptions.form = form;
      requestBodyForLog = { form: this.redactBody(form) };
    } else if (args.json !== undefined) {
      fetchOptions.data = args.json;
      headers['content-type'] = headers['content-type'] ?? 'application/json';
      requestBodyForLog = { json: this.redactBody(args.json) };
    }

    if (this.shouldLogRequest()) {
      this.logger!.debug(
        `[API ->] ${args.method} ${url.toString()} ` +
          `headers=${JSON.stringify(this.redactHeaders(headers))} ` +
          (requestBodyForLog ? `body=${JSON.stringify(requestBodyForLog)}` : ''),
      );
    }

    const response = await this.request.fetch(url.toString(), fetchOptions);

    const status = response.status();
    const ok = response.ok();
    const allHeaders = response.headers();
    const rawText = await response.text();

    let parsed: any = undefined;

    const contentType = (allHeaders['content-type'] ?? '').toLowerCase();
    const looksJson =
      contentType.includes('application/json') ||
      rawText.trim().startsWith('{') ||
      rawText.trim().startsWith('[');

    if (looksJson) {
      try {
        parsed = JSON.parse(rawText);
      } catch {}
    }

    if (this.shouldLogResponse(status)) {
      const safeRespHeaders = this.redactHeaders(allHeaders);
      const safeRespBody =
        parsed !== undefined ? JSON.stringify(this.redactBody(parsed)) : this.truncate(rawText);

      this.logger!.warn(
        `[API <-] ${args.method} ${url.toString()} status=${status} ok=${ok} ` +
          `headers=${JSON.stringify(safeRespHeaders)} body=${this.truncate(safeRespBody)}`,
      );
    }

    return {
      url: url.toString(),
      method: args.method,
      status,
      ok,
      headers: allHeaders,
      rawText,
      json: parsed as T | undefined,
    };
  }
}
