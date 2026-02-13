import { expect } from '@playwright/test';
import { ApiCallResult } from '../client/ApiClient';
import {
  BaseResponse,
  BrandsListResponse,
  CreateAccountResponse,
  DeleteAccountResponse,
  GetUserDetailByEmailResponse,
  ProductsListResponse,
  SearchProductResponse,
  UpdateAccountResponse,
  VerifyLoginResponse,
} from '../dto/automationExercise.dto';
import {
  expectOk2xx,
  expectJsonParsed,
  expectResponseCode,
  expectStatus,
  expectMessageContains,
} from './http.assertions';
import { ContractAssertions } from './ae.contract.assertions';

export const ApiAssertions = {
  //API-1
  productListOk(res: ApiCallResult<ProductsListResponse>) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.productsList(res);

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

    ContractAssertions.baseResponse(res, 'API-2 productsList POST 405 baseResponse');

    expectMessageContains(res, 'This request method is not supported');
  },

  //API-3
  brandsListOk(res: ApiCallResult<BrandsListResponse>) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.brandsList(res);

    expect(Array.isArray(res.json.brands), 'brands should be array').toBeTruthy();
  },

  //API-4
  brandsListPutShould405(res: ApiCallResult<BaseResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 405);

    ContractAssertions.baseResponse(res, 'API-4 brandsList PUT 405 baseResponse');

    expectMessageContains(res, 'This request method is not supported');
  },

  //API-5
  searchProductOk(res: ApiCallResult<SearchProductResponse>, expectedQuery: string) {
    expectOk2xx(res);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.searchProduct(res);

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

  //API-6
  searchProductWithoutParamShould400(res: ApiCallResult<BaseResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 400);

    ContractAssertions.baseResponse(res, 'API-6 searchProduct missing param baseResponse');

    expectMessageContains(res, 'Bad request, search_product parameter is missing in POST request.');
  },

  //API-7
  verifyLoginValidShould200(res: ApiCallResult<VerifyLoginResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.verifyLogin(res, 'API-7 verifyLogin valid');

    expectMessageContains(res, 'User exists');
  },

  //API-8
  verifyLoginMissingEmailShould400(res: ApiCallResult<VerifyLoginResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 400);

    ContractAssertions.verifyLogin(res, 'API-8 verifyLogin missing email');

    expectMessageContains(res, 'email or password parameter is missing');
  },

  //API-9
  verifyLoginDeleteShould405(res: ApiCallResult<BaseResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 405);

    ContractAssertions.baseResponse(res, 'API-9 verifyLogin DELETE 405 baseResponse');

    expectMessageContains(res, 'This request method is not supported.');
  },

  //API-10
  verifyLoginInvalidCredsShould404(res: ApiCallResult<BaseResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 404);

    ContractAssertions.baseResponse(res, 'API-10 verifyLogin invalid creds baseResponse');

    expectMessageContains(res, 'User not found!');
  },

  //API-11
  createAccountShould201(res: ApiCallResult<CreateAccountResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 201);

    ContractAssertions.createAccount(res);

    expectMessageContains(res, 'User created!');
  },

  //API-12
  deleteAccountShould200(res: ApiCallResult<DeleteAccountResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.deleteAccount(res);

    expectMessageContains(res, 'Account deleted!');
  },

  //API-13
  updateAccountShould200(res: ApiCallResult<UpdateAccountResponse>) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.updateAccount(res);

    expectMessageContains(res, 'User updated');
  },

  //API-14
  getUserDetailByEmailShould200(
    res: ApiCallResult<GetUserDetailByEmailResponse>,
    expectedEmail: string,
  ) {
    expectStatus(res, 200);
    expectJsonParsed(res);
    expectResponseCode(res, 200);

    ContractAssertions.getUserDetailByEmail(res);

    expect(res.json.user, 'user should exist').toBeDefined();
    expect(String(res.json.user?.email ?? '').toLowerCase()).toBe(expectedEmail.toLowerCase());
  },

  //OTHER
  verifyLoginHasResponseCode(res: ApiCallResult<VerifyLoginResponse>) {
    expectOk2xx(res);
    expectJsonParsed(res);

    ContractAssertions.verifyLogin(res, 'OTHER verifyLogin has responseCode');

    expect(res.json.responseCode, 'responseCode should exist').toBeDefined();
    expect(res.json.message, 'message should exist').toBeDefined();
  },
};
