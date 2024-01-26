import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProduct, IProductCreationData } from '../../types';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1/';
const PRODUCTS_PATH = 'products';
const PRODUCTS_TAG = 'Products';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: [PRODUCTS_TAG],
  endpoints: builder => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => PRODUCTS_PATH,
      providesTags: [PRODUCTS_TAG],
    }),
    getProductById: builder.query<IProduct, string | undefined>({
      query: id => `${PRODUCTS_PATH}/${id}`,
      providesTags: [PRODUCTS_TAG],
    }),
    deleteProduct: builder.mutation<boolean, number>({
      query: id => ({
        url: `${PRODUCTS_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PRODUCTS_TAG],
    }),
    createProduct: builder.mutation<IProduct, IProductCreationData>({
      query: values => ({
        url: PRODUCTS_PATH,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: [PRODUCTS_TAG],
    }),
    updateProduct: builder.mutation<IProduct, Pick<IProduct, 'id' | 'price' | 'title'>>({
      query: ({ id, ...restValues }) => ({
        url: `${PRODUCTS_PATH}/${id}`,
        method: 'PUT',
        body: restValues,
      }),
      invalidatesTags: [PRODUCTS_TAG],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApi;

export default productsApi;
