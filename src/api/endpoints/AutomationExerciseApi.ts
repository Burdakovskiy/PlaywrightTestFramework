import { ApiClient } from '../client/ApiClient';
import {
  ProductsListResponse,
  SearchProductResponse,
  VerifyLoginResponse,
  BrandsListResponse,
} from '../dto/automationExercise.dto';
import { AE_ROUTES } from '../routes/ae.routes';

export class AutomationExerciseApi {
  constructor(private readonly client: ApiClient) {}

  //API-1
  getProductList() {
    return this.client.call<ProductsListResponse>({
      method: 'GET',
      path: AE_ROUTES.productsList,
    });
  }

  //API-2
  postToAllProductsList() {
    return this.client.call<ProductsListResponse>({
      method: 'POST',
      path: AE_ROUTES.productsList,
    });
  }

  //API-3
  getAllBrandsList() {
    return this.client.call<BrandsListResponse>({
      method: 'GET',
      path: AE_ROUTES.brandsList,
    });
  }

  //API-4
  putToAllBrandsList() {
    return this.client.call<BrandsListResponse>({
      method: 'PUT',
      path: AE_ROUTES.brandsList,
    });
  }

  //API-5
  searchProduct(searchProduct: string) {
    return this.client.call<SearchProductResponse>({
      method: 'POST',
      path: AE_ROUTES.searchProduct,
      form: { search_product: searchProduct },
    });
  }

  //OTHER
  verifyLogin(email: string, password: string) {
    return this.client.call<VerifyLoginResponse>({
      method: 'POST',
      path: AE_ROUTES.verifyLogin,
      form: { email, password },
    });
  }
}
