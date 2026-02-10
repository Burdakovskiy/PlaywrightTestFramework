import { ApiClient } from '../client/ApiClient';
import {
  ProductsListResponse,
  SearchProductResponse,
  VerifyLoginResponse,
} from '../dto/automationExercise.dto';

export class AutomationExerciseApi {
  constructor(private readonly client: ApiClient) {}

  getProductList() {
    return this.client.call<ProductsListResponse>({
      method: 'GET',
      path: '/api/productsList',
    });
  }

  searchProduct(searchProduct: string) {
    return this.client.call<SearchProductResponse>({
      method: 'POST',
      path: '/api/searchProduct',
      form: { search_product: searchProduct },
    });
  }

  verifyLogin(email: string, password: string) {
    return this.client.call<VerifyLoginResponse>({
      method: 'POST',
      path: '/api/verifyLogin',
      form: { email, password },
    });
  }
}
