import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../interfaces/category';



export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/categories/' }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: '/getAllCategories',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
