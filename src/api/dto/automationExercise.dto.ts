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

export type ProductsListResponse = BaseResponse & {
  products?: Product[];
};

export type BrandsListResponse = BaseResponse & {
  brands?: Array<{ id?: number | string; brand?: string }>;
};

export type SearchProductResponse = BaseResponse & {
  products?: Product[];
};

export type VerifyLoginResponse = BaseResponse & {};
