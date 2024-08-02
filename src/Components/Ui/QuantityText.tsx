import React from 'react';
import { useAppSelector } from '../../Hooks/hooks';

const TotalItemText: React.FC = () => {
    const totalItems = useAppSelector((state) => state.shoppingList.totalItems);

    return (
        <div aria-live="polite">
            <h2>Total Items: {totalItems}</h2>
        </div>
    );
};

export default TotalItemText;
