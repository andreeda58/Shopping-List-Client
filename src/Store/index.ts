// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import ShoppingListReducer from './slices/ShoppingList';
import { productApi } from '../Store/apis/productApi';
import { categoryApi } from './apis/categoryApi';
import { shoppingListApi } from './apis/shoppingListApi';

export const store = configureStore({
  reducer: {
    shoppingList: ShoppingListReducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [shoppingListApi.reducerPath]:shoppingListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(productApi.middleware)
  .concat(categoryApi.middleware)
  .concat(shoppingListApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './apis/productApi'
export * from './apis/categoryApi'
export * from './apis/shoppingListApi'
export * from './slices/ShoppingList'
