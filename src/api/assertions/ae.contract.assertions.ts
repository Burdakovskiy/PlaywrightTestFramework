import { ApiCallResult } from '../client/ApiClient';
import { validateSchema } from '../contracts/contractValidator';
import { AeSchemas } from '../contracts/ae.schemas';

export const ContractAssertions = {
  productsList(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-1 productsListResponse',
      schema: AeSchemas.productsListResponse,
      data: res.json,
    });
  },

  baseResponse(res: ApiCallResult<any>, name: string) {
    validateSchema({
      name,
      schema: AeSchemas.baseResponse,
      data: res.json,
    });
  },

  brandsList(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-3 brandsListResponse',
      schema: AeSchemas.brandsListResponse,
      data: res.json,
    });
  },

  searchProduct(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-5 searchProductResponse',
      schema: AeSchemas.searchProductResponse,
      data: res.json,
    });
  },

  verifyLogin(res: ApiCallResult<any>, name: string) {
    validateSchema({
      name,
      schema: AeSchemas.verifyLoginResponse,
      data: res.json,
    });
  },

  createAccount(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-11 createAccountResponse',
      schema: AeSchemas.createAccountResponse,
      data: res.json,
    });
  },

  deleteAccount(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-12 deleteAccountResponse',
      schema: AeSchemas.deleteAccountResponse,
      data: res.json,
    });
  },

  updateAccount(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-13 updateAccountResponse',
      schema: AeSchemas.updateAccountResponse,
      data: res.json,
    });
  },

  getUserDetailByEmail(res: ApiCallResult<any>) {
    validateSchema({
      name: 'API-14 getUserDetailByEmailResponse',
      schema: AeSchemas.getUserDetailByEmailResponse,
      data: res.json,
    });
  },
};
