import React from 'react';
import { ProductInList } from '../../Store/interfaces/index';
import { useAppSelector } from '../../Hooks/hooks';

const CategoriesCard: React.FC<{ categoryId: string, categoryName: string }> = ({ categoryId, categoryName }) => {

    //Gets the products from the shopping list whose category is equal to that received by the parent
    const productsInList = useAppSelector((state) => state.shoppingList.items)
        .filter(item => item.product.categoryId === categoryId);

    const renderProductsListByCategory = (productsInList: ProductInList[]) => {
        return (
            <ul className="card-text text-end" dir="rtl">
                {productsInList.map((item) => (
                    <li className="text-end" key={item.product.id}>
                        {item.product.name} {item.quantity > 1 ? `(${item.quantity})` : ""}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body text-end">
                <h5 className="card-title">{categoryName} {`-  ${productsInList.length} מוצרים `}</h5>
                {productsInList.length === 0 ? <p>Loading...</p> : renderProductsListByCategory(productsInList)}
            </div>
        </div>
    );
};

export default CategoriesCard;
