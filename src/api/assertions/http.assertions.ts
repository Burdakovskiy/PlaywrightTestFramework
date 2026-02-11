import { expect } from '@playwright/test';
import { ApiCallResult } from '../client/ApiClient';

export function expectStatus(res: ApiCallResult<any>, expected: number) {
  expect(
    res.status,
    `Unexpected HTTP status. expected=${expected}, actual=${res.status}\nURL=${res.url}\nBODY=${res.rawText}`,
  ).toBe(expected);
}

export function expectOk2xx(res: ApiCallResult<any>) {
  expect(
    res.ok,
    `HTTP not ok (expected 2xx). status=${res.status}\nURL=${res.url}\nBODY=${res.rawText}`,
  ).toBeTruthy();
}

export function expectJsonParsed<T>(
  res: ApiCallResult<T>,
): asserts res is ApiCallResult<T> & { json: T } {
  expect(res.json, `No JSON parsed.\nURL=${res.url}\nBODY=${res.rawText}`).toBeTruthy();
}

export function expectResponseCode(
  res: ApiCallResult<{ responseCode?: number | string }>,
  code: number,
) {
  const actual = res.json?.responseCode;
  expect(
    [code, String(code)],
    `Unexpected responseCode. expected=${code}, actual=${actual}\nURL=${res.url}\nBODY=${res.rawText}`,
  ).toContain(actual);
}

export function expectMessageContains(res: ApiCallResult<{ message?: string }>, needle: string) {
  const msg = String(res.json?.message ?? '');
  expect(
    msg.toLowerCase(),
    `Unexpected message.\nExpected to contain: ${needle}\nActual: ${msg}\nURL=${res.url}\nBODY=${res.rawText}`,
  ).toContain(needle.toLowerCase());
}
