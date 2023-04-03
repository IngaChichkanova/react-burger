import React from 'react';
import PropTypes from 'prop-types';
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

IngredientDetails.propTypes = {
    details: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }),
}