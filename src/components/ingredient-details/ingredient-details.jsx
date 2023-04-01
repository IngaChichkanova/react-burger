import React from 'react';
import ingredientDetailsStyles from '././ingredient-details.module.css';

const IngredientDetails = ({ details }) => {

    return (
        <section className={`${ingredientDetailsStyles.ingredient} mb-15`}>
            <p className={`mt-1 mb-1`}><img src={details.image_large} alt={details.name} /></p>
            <p className={`text text_type_main-medium mt-4 mb-8`}>{details.name}</p>
            <div className={`${ingredientDetailsStyles.property}`}>
                <div className={`${ingredientDetailsStyles.info} text text_type_main-default mr-5`}>
                    <p>Калории,ккал</p>
                    <p>{details.calories}</p>
                </div>
                <div className={`${ingredientDetailsStyles.info} text text_type_main-default mr-5`}>
                    <p>Белки, г</p>
                    <p>{details.proteins}</p>
                </div>
                <div className={`${ingredientDetailsStyles.info} text text_type_main-default mr-5`}>
                    <p>Жиры, г</p>
                    <p>{details.fat}</p>
                </div>
                <div className={`${ingredientDetailsStyles.info} text text_type_main-default`}>
                    <p>Углеводы, г</p>
                    <p>{details.carbohydrates}</p>
                </div>
            </div>
        </section>
    );
}

export default IngredientDetails;