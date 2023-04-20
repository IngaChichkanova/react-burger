import React from 'react';
import ingredientDetailsStyles from '././ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const { currentIngredient } = useSelector(state => state.ingredients);

    return (
        <>
            <div className={`${ingredientDetailsStyles.header}`}>
                <p className={`${ingredientDetailsStyles.title} ml-10 mt-10 text text_type_main-large`}>Детали ингредиента</p>
            </div>

            <div className={`${ingredientDetailsStyles.ingredient} mb-15`}>
                <p className={`mt-1 mb-1`}><img src={currentIngredient.image_large} alt={currentIngredient.name} /></p>
                <p className={`text text_type_main-medium mt-4 mb-8`}>{currentIngredient.name}</p>
                <div className={`${ingredientDetailsStyles.property}`}>
                    <div className={`${ingredientDetailsStyles.info} text text_type_main-default mr-5`}>
                        <p>Калории,ккал</p>
                        <p>{currentIngredient.calories}</p>
                    </div>
                    <div className={`${ingredientDetailsStyles.info} text text_type_main-default mr-5`}>
                        <p>Белки, г</p>
                        <p>{currentIngredient.proteins}</p>
                    </div>
                    <div className={`${ingredientDetailsStyles.info} text text_type_main-default mr-5`}>
                        <p>Жиры, г</p>
                        <p>{currentIngredient.fat}</p>
                    </div>
                    <div className={`${ingredientDetailsStyles.info} text text_type_main-default`}>
                        <p>Углеводы, г</p>
                        <p>{currentIngredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IngredientDetails;