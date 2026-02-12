export type BaseResponse = {
  responseCode?: number | string;
  message?: string;
};

export type Product = {
  id: number | string;
  name: string;
  price: string;
  brand: string;
  category?: {
    usertype?: { usertype: string };
    category?: string;
  };
};

export type UserDetail = {
  id?: number | string;
  name?: string;
  email?: string;

  title?: string;
  birth_day?: string;
  birth_date?: string;
  birth_month?: string;
  birth_year?: string;

  first_name?: string;
  firstname?: string;

  last_name?: string;
  lastname?: string;

  company?: string;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  mobile_number?: string;
};

export type GetUserDetailByEmailResponse = BaseResponse & {
  user?: UserDetail;
};

export type ProductsListResponse = BaseResponse & {
  products?: Product[];
};

export type BrandsListResponse = BaseResponse & {
  brands?: Array<{ id?: number | string; brand?: string }>;
};

export type SearchProductResponse = BaseResponse & {
  products?: Product[];
};

export type CreateAccountResponse = BaseResponse;

export type DeleteAccountResponse = BaseResponse;

export type UpdateAccountResponse = BaseResponse;

export type VerifyLoginResponse = BaseResponse;
