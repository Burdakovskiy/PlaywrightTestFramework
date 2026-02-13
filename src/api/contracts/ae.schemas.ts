import type { AnySchema } from 'ajv';

export const AeSchemas = {
  baseResponse: {
    $id: 'ae.baseResponse',
    type: 'object',
    required: ['responseCode'],
    properties: {
      responseCode: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      message: { type: 'string' },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  product: {
    $id: 'ae.product',
    type: 'object',
    required: ['id', 'name', 'price', 'brand'],
    properties: {
      id: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      name: { type: 'string' },
      price: { type: 'string' },
      brand: { type: 'string' },

      category: {
        type: 'object',
        required: [],
        properties: {
          usertype: {
            type: 'object',
            required: [],
            properties: {
              usertype: { type: 'string' },
            },
            additionalProperties: true,
          },
          category: { type: 'string' },
        },
        additionalProperties: true,
      },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  productsListResponse: {
    $id: 'ae.productsListResponse',
    type: 'object',
    required: ['responseCode', 'products'],
    properties: {
      responseCode: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      message: { type: 'string' },
      products: {
        type: 'array',
        minItems: 1,
        items: { $ref: 'ae.product' },
      },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  brandsListResponse: {
    $id: 'ae.brandsListResponse',
    type: 'object',
    required: ['responseCode', 'brands'],
    properties: {
      responseCode: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      message: { type: 'string' },
      brands: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['id', 'brand'],
          properties: {
            id: { anyOf: [{ type: 'number' }, { type: 'string' }] },
            brand: { type: 'string' },
          },
          additionalProperties: true,
        },
      },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  searchProductResponse: {
    $id: 'ae.searchProductResponse',
    type: 'object',
    required: ['responseCode', 'products'],
    properties: {
      responseCode: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      message: { type: 'string' },
      products: {
        type: 'array',
        minItems: 1,
        items: { $ref: 'ae.product' },
      },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  verifyLoginResponse: {
    $id: 'ae.verifyLoginResponse',
    type: 'object',
    required: ['responseCode'],
    properties: {
      responseCode: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      message: { type: 'string' },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  createAccountResponse: { $ref: 'ae.baseResponse' } satisfies AnySchema,
  deleteAccountResponse: { $ref: 'ae.baseResponse' } satisfies AnySchema,
  updateAccountResponse: { $ref: 'ae.baseResponse' } satisfies AnySchema,

  getUserDetailByEmailResponse: {
    $id: 'ae.getUserDetailByEmailResponse',
    type: 'object',
    required: ['responseCode', 'user'],
    properties: {
      responseCode: { anyOf: [{ type: 'number' }, { type: 'string' }] },
      message: { type: 'string' },
      user: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' },
          id: { anyOf: [{ type: 'number' }, { type: 'string' }] },
          name: { type: 'string' },

          title: { type: 'string' },

          birth_day: { type: 'string' },
          birth_date: { type: 'string' },
          birth_month: { type: 'string' },
          birth_year: { type: 'string' },

          first_name: { type: 'string' },
          firstname: { type: 'string' },

          last_name: { type: 'string' },
          lastname: { type: 'string' },

          company: { type: 'string' },
          address1: { type: 'string' },
          address2: { type: 'string' },
          country: { type: 'string' },
          state: { type: 'string' },
          city: { type: 'string' },
          zipcode: { type: 'string' },
          mobile_number: { type: 'string' },
        },
        additionalProperties: true,
      },
    },
    additionalProperties: true,
  } satisfies AnySchema,

  allSchemas(): AnySchema[] {
    return [
      this.baseResponse,
      this.product,
      this.productsListResponse,
      this.brandsListResponse,
      this.searchProductResponse,
      this.verifyLoginResponse,
      this.getUserDetailByEmailResponse,
    ];
  },
};
