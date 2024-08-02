import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../interfaces/product';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/products/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'product',
        }),
        getProductsByCategoryId: builder.query<Product[], string>({
            query: (categoryId) => ({
                url: `getProductsByCategoryId/${categoryId}`,
                method: 'GET',
            }),
        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (product) => ({
                url: 'addNewProduct',
                method: 'PUT',
                body: product,
            }),
        }),
        updateProductQuantity: builder.mutation<Product, Partial<Product>>({
            query: (product) => ({
                url: `updateProductQuantity`,
                method: 'PUT',
                body: product,
            }),
        }),
        addAllProducts:builder.mutation<Product[], Partial<Product[]>>({
            query: (products) => ({
                url: '/addAllProducts',
                method: 'PUT',
                body: products,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductsByCategoryIdQuery,
    useAddProductMutation,
    useUpdateProductQuantityMutation,
    useAddAllProductsMutation
} = productApi;
