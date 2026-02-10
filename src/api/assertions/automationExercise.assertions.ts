import { expect } from '@playwright/test';
import { ApiCallResult } from '../client/ApiClient';
import {
  ProductsListResponse,
  SearchProductResponse,
  VerifyLoginResponse,
} from '../dto/automationExercise.dto';

function expectHttpOk(res: ApiCallResult<any>) {
  expect(res.ok, `HTTP not ok. status=${res.status}, body=${res.rawText}`).toBeTruthy();
}

function expectJsonParsed<T>(res: ApiCallResult<T>): asserts res is ApiCallResult<T> & { json: T } {
  expect(res.json, `No JSON parsed. raw=${res.rawText}`).toBeTruthy();
}

function expectResponseCodeOk(res: ApiCallResult<{ responseCode?: number | string }>) {
  const code = (res.json?.responseCode ?? '') as any;
  expect([200, '200']).toContain(code);
}

export const ApiAssertions = {
  productListOk(res: ApiCallResult<ProductsListResponse>) {
    expectHttpOk(res);
    expectJsonParsed(res);
    expectResponseCodeOk(res);

    expect(Array.isArray(res.json?.products), 'products should be array').toBeTruthy();
    expect((res.json?.products ?? []).length, 'products should not be empty').toBeGreaterThan(0);

    const first = (res.json?.products ?? [])[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('price');
    expect(first).toHaveProperty('brand');
  },

  searchProductOk(res: ApiCallResult<SearchProductResponse>, expectedQuery: string) {
    expectHttpOk(res);
    expectJsonParsed(res);
    expectResponseCodeOk(res);

    expect(Array.isArray(res.json?.products), 'products should be array').toBeTruthy();

    const products = res.json?.products ?? [];
    if (products.length > 0) {
      const anyMatches = products.some((product) =>
        String(product.name ?? '')
          .toLowerCase()
          .includes(expectedQuery.toLocaleLowerCase()),
      );
      expect(anyMatches, 'at least one product should match query').toBeTruthy();
    }
  },

  verifyLoginHasResponseCode(res: ApiCallResult<VerifyLoginResponse>) {
    expectHttpOk(res);
    expectJsonParsed(res);
    expect(res.json?.responseCode, 'responseCode should exist').toBeDefined();
    expect(res.json?.message, 'message should exist').toBeDefined();
  },
};
