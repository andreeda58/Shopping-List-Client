import React from 'react';
import ProductForm from './Components/ProductForm';
import ProductList from './Components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGetCategoriesQuery } from './Store/apis/categoryApi';
import { Category } from './Store/interfaces/category';

const App: React.FC = () => {
  const { data: categories = [], error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery();
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center align-items-center bg-light mb-5">
        <h1 className="text-center p-3">Shopping List</h1>
      </div>
      <ProductForm categories={categories as Category[]} />
      <hr className="my-5" />
      <ProductList categories={categories as Category[]} />
    </div>
  );
};

export default App;
