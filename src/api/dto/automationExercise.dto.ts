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

export type SearchProductResponse = BaseResponse & {
  products?: Product[];
};

export type VerifyLoginResponse = BaseResponse & {};
