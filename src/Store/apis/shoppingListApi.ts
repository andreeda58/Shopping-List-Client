import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShoppingList } from '../interfaces/shoppingList';

export const shoppingListApi = createApi({
    reducerPath: 'shoppingListApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/shoppinglists/' }),
    endpoints: (builder) => ({
        saveShoppingList: builder.mutation<ShoppingList, Partial<ShoppingList>>({
            query: (shoppingList) => ({
                url: '/saveShoppingList',
                method: 'PUT',
                body: shoppingList,
            }),
        }),
    }),
});

export const { useSaveShoppingListMutation } = shoppingListApi;
