import { UserEntity } from '../../domain/UserEntity';
import { Mapper } from '../../utils/Mapper';
import { ApiClient } from '../client/ApiClient';
import {
  ProductsListResponse,
  SearchProductResponse,
  VerifyLoginResponse,
  BrandsListResponse,
  CreateAccountResponse,
  DeleteAccountResponse,
  UpdateAccountResponse,
  BaseResponse,
  GetUserDetailByEmailResponse,
} from '../dto/automationExercise.dto';
import { AE_ROUTES } from '../routes/ae.routes';

export class AutomationExerciseApi {
  constructor(private readonly client: ApiClient) {}

  getProductList() {
    return this.client.call<ProductsListResponse>({
      method: 'GET',
      path: AE_ROUTES.productsList,
    });
  }

  postToAllProductsList() {
    return this.client.call<BaseResponse>({
      method: 'POST',
      path: AE_ROUTES.productsList,
    });
  }

  getAllBrandsList() {
    return this.client.call<BrandsListResponse>({
      method: 'GET',
      path: AE_ROUTES.brandsList,
    });
  }

  putToAllBrandsList() {
    return this.client.call<BaseResponse>({
      method: 'PUT',
      path: AE_ROUTES.brandsList,
    });
  }

  searchProduct(searchProduct: string) {
    return this.client.call<SearchProductResponse>({
      method: 'POST',
      path: AE_ROUTES.searchProduct,
      form: { search_product: searchProduct },
    });
  }

  searchProductWithoutParamener() {
    return this.client.call<BaseResponse>({
      method: 'POST',
      path: AE_ROUTES.searchProduct,
    });
  }

  createAccount(user: UserEntity) {
    return this.client.call<CreateAccountResponse>({
      method: 'POST',
      path: AE_ROUTES.createAccount,
      form: Mapper.mapUserToAccountForm(user),
    });
  }

  deleteAccount(email: string, password: string) {
    return this.client.call<DeleteAccountResponse>({
      method: 'DELETE',
      path: AE_ROUTES.deleteAccount,
      form: { email, password },
    });
  }

  verifyLogin(email: string, password: string) {
    return this.client.call<VerifyLoginResponse>({
      method: 'POST',
      path: AE_ROUTES.verifyLogin,
      form: { email, password },
    });
  }

  updateAccount(user: UserEntity) {
    return this.client.call<UpdateAccountResponse>({
      method: 'PUT',
      path: AE_ROUTES.updateAccount,
      form: Mapper.mapUserToAccountForm(user),
    });
  }

  verifyLoginWithoutEmail(password: string) {
    return this.client.call<VerifyLoginResponse>({
      method: 'POST',
      path: AE_ROUTES.verifyLogin,
      form: { password },
    });
  }

  deleteToVerifyLogin() {
    return this.client.call<BaseResponse>({
      method: 'DELETE',
      path: AE_ROUTES.verifyLogin,
    });
  }

  getUserDetailByEmail(email: string) {
    return this.client.call<GetUserDetailByEmailResponse>({
      method: 'GET',
      path: AE_ROUTES.getUserDetailByEmail,
      query: { email },
    });
  }
}
