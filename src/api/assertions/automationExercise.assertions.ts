import { expect } from '@playwright/test';
import { ApiCallResult } from '../client/ApiClient';
import {
  BaseResponse,
  BrandsListResponse,
  ProductsListResponse,
  SearchProductResponse,
  VerifyLoginResponse,
} from '../dto/automationExercise.dto';
import {
  expectOk2xx,
  expectJsonParsed,
  expectResponseCode,
  expectStatus,
  expectMessageContains,
} from './http.assertions';

export const ApiAssertions = {
  //API-1
  productListOk(res: ApiCallResult<ProductsListResponse>) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    expect(Array.isArray(res.json.products), 'products should be array').toBeTruthy();
    expect((res.json.products ?? []).length, 'products should not be empty').toBeGreaterThan(0);

    const first = (res.json.products ?? [])[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('price');
    expect(first).toHaveProperty('brand');
  },

  //API-2
  productListPostShould405(res: ApiCallResult<BaseResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 405);

    expect(res.json.message).toContain('This request method is not supported');
  },

  //API-3
  brandsListOk(res: ApiCallResult<BrandsListResponse>) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    expect(Array.isArray(res.json.brands), 'brands should be array').toBeTruthy();
  },

  //API-4
  brandsListPutShould405(res: ApiCallResult<BaseResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 405);

    expect(res.json.message).toContain('This request method is not supported');
  },

  //API-5
  searchProductOk(res: ApiCallResult<SearchProductResponse>, expectedQuery: string) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    expect(Array.isArray(res.json.products), 'Products should be array').toBeTruthy();
    expect(res.json.products?.length, 'Search should return at least one product').toBeGreaterThan(
      0,
    );
    const anyMatches = res.json.products?.some((product) =>
      String(product.name ?? '')
        .toLowerCase()
        .includes(expectedQuery.toLowerCase()),
    );

    expect(anyMatches, `At least one product name should contain "${expectedQuery}"`).toBeTruthy();
  },

  //OTHER
  verifyLoginHasResponseCode(res: ApiCallResult<VerifyLoginResponse>) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expect(res.json.responseCode, 'responseCode should exist').toBeDefined();
    expect(res.json.message, 'message should exist').toBeDefined();
  },
};
