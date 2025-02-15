import { useAppSelector, useAppDispatch } from '../Hooks/hooks';
import React, { useState, useEffect, useCallback } from 'react';
import { Category, Product, ProductInList, ShoppingList } from '../Store/interfaces/index';
import CategoriesCard from './Ui/CategoriesCard';
import { clearShoppingList, useSaveShoppingListMutation, useAddAllProductsMutation } from '../Store';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  categories: Category[];
}

const ProductList: React.FC<Props> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const items: ProductInList[] = useAppSelector((state) => state.shoppingList.items);
  const [categoriesOnList, setCategoriesOnList] = useState<Category[]>([]);
  const [saveShoppingList] = useSaveShoppingListMutation();
  const [addAllProducts] = useAddAllProductsMutation();


  //The checkCategoriesOnList function is a React hook that processes a list of products and determines which categories are present in the list. 
  //It utilizes the useCallback hook to memoize the function, ensuring it only re-creates if its dependencies change.
  const checkCategoriesOnList = useCallback((items: ProductInList[]) => {
    const categoryIds = new Set(items.map(item => item.product.categoryId));
    const categoriesInList = categories.filter(category => categoryIds.has(category.id));
    console.log("Categories in list:", categoriesInList);
    setCategoriesOnList(categoriesInList);
  }, [categories]);

  //Renders the page for each change in the list to display the updated data
  useEffect(() => {
    checkCategoriesOnList(items);
  }, [items, checkCategoriesOnList]);


  //render Products In List By Categories and send data to CategoriesCard
  const renderProductsInListByCategories = () => {
    console.log("Categories to render:", categoriesOnList);
    return categoriesOnList.map(category => (
      <div key={category.id} className="col-12 col-md-6 col-lg-4 mb-4">
        <CategoriesCard categoryId={category.id} categoryName={category.name} />
      </div>
    ));
  }

  //convert data from shoppingList to save in DB
  const getListOfProductsFromItemsToSave = (items: ProductInList[]): Product[] => {
    return items.map(item => {
      const product = item.product;
      return product ? { ...product } : null;
    }).filter(product => product !== null) as Product[];
  };

  //convert data from shoppingList to save in DB
  const getProductsFormatIdQuantity = (items: ProductInList[]): any[] => {
    return items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
  };

  const handleClick = async () => {
    try {
      // Get List Of Products From shoppingList
      const products: Product[] = getListOfProductsFromItemsToSave(items);

      // Create new shoppingList data
      const newShoppingList: ShoppingList = {
        id: uuidv4(),
        date: new Date(),
        products: getProductsFormatIdQuantity(items)
      }

      // Save data to db
      await addAllProducts( products ).unwrap() // Enviar datos como un objeto
        .then((payload) => console.log('fulfilled', payload))
        .catch((error) => console.error('rejected', error));

      await saveShoppingList(newShoppingList ).unwrap() 
        .then((payload) => console.log('fulfilled', payload))
        .catch((error) => console.error('rejected', error));

      // Clean and reset state of shoppinglist and  totalItems from the store
      dispatch(clearShoppingList());
      alert('Shopping list saved successfully!');
    } catch (error) {
      console.error('Failed to save shopping list: ', error);
    }
  }

  return (
    <div className="container">
      <div className="row g-3">
        {renderProductsInListByCategories()}
      </div>
      <div className="d-flex justify-content-center mt-4">
        {items.length > 0 &&<button onClick={handleClick} className="btn btn-success">Save List</button>}
      </div>
    </div>
  );
};

export default ProductList;
