import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, ProductInList } from '../interfaces/index';

interface ShoppingListState {
    items: ProductInList[];
    categories: Category[];
    totalItems: number;
}

const initialState: ShoppingListState = {
    categories: [],
    items: [],
    totalItems: 0,
};

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        addProductToList: (state, action: PayloadAction<ProductInList>) => {
            const index = state.items.findIndex(product => product.product.name === action.payload.product.name);
            if (index !== -1) { // Corregir la verificación del índice
                state.items[index].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalItems += 1;
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        updateProductQuantityInList: (state, action: PayloadAction<{ name: string; quantity: number }>) => {
            const { name, quantity } = action.payload;
            const product = state.items.find(item => item.product.name === name);
            if (product) {
                product.quantity = quantity;
                state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
            }
        },
        clearShoppingList: (state) => {
            state.items = [];
            state.totalItems = 0;
        }
    },
});

export const { addProductToList, addCategory, updateProductQuantityInList, clearShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
