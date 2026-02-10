import { APIRequestContext } from '@playwright/test';

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

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

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

    if (args.form) {
      fetchOptions.form = Object.fromEntries(
        Object.entries(args.form).filter(([, value]) => value !== undefined && value !== null),
      );
    } else if (args.json !== undefined) {
      fetchOptions.data = args.json;
      headers['content-type'] = headers['content-type'] ?? 'application/json';
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
