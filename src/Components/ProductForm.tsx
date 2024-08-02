import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks/hooks';
import TotalItemText from './Ui/QuantityText';
import {
    addProductToList
} from '../Store';
import { Product, Category, ProductInList } from '../Store/interfaces/index';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    categories: Category[];
}

const ProductForm: React.FC<Props> = ({ categories }) => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState<string>('');
    const dispatch = useAppDispatch();
 

    //get shopping list items from de state
    const shoppingList = useAppSelector((state) => state.shoppingList.items);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            //if the product exist update the quantity of the product in the shoppingList else add to the list 
            const oldProduct = shoppingList.find(item => item.product.name === name);

            if (oldProduct) {

                //create the new product data
                const updatedProduct = {
                    ...oldProduct,
                    quantity: oldProduct.quantity + 1
                };
                
                //send new product data to the shoppingList state 
                dispatch(addProductToList(updatedProduct));
            } else {

                //create productInList data
                const product:Product={id:uuidv4(), name, categoryId}
                const productInList: ProductInList = {quantity:1, product};
                //add to to shoppingList state 
                dispatch(addProductToList(productInList));
            }

            //reset
            setName('');
            setCategoryId('');

        } catch (error) {
            console.error('Failed to add product: ', error);
        }
    };

    return (
        <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6">
                <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product Name"
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="form-select">
                            <option value="" disabled>Select a category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary w-100">Add Product</button>
                    </div>
                </form>
            </div>
            <div className="col-12 col-md-4 col-lg-3 text-end mt-3 mt-md-0">
                <TotalItemText />
            </div>
        </div>
    );
};

export default ProductForm;
