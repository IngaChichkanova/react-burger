import { FC, HTMLAttributes, useEffect } from 'react';
import ingredientDetailsStyles from '././ingredient-details.module.css';
import { useLocation } from 'react-router-dom';
import { updateCurrentIngredient } from '../../services/actions/ingredient-modal';
import { getIngedients } from '../../services/actions/ingredients';
import { TIngredient, useSelector, RootState, useDispatch } from '../../utils/types';

const IngredientDetails: FC<HTMLAttributes<HTMLHtmlElement>> = () => {
    const dispatch = useDispatch();
    const currentIngredient = useSelector((state: RootState) => state.ingredientModal.currentIngredient);
    const ingredientsListFailed = useSelector((state: RootState) => state.ingredients.ingredientsListFailed);
    const ingredientsListRequest = useSelector((state: RootState) => state.ingredients.ingredientsListRequest);
    const ingredientsList = useSelector((state: RootState) => state.ingredients.ingredientsList);

    const location = useLocation();

    useEffect((): ReturnType<React.EffectCallback> => {
        if (!location.state) {
            dispatch(getIngedients());
        }

        return (): any => dispatch(updateCurrentIngredient(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!ingredientsListRequest && !ingredientsListFailed && ingredientsList.length > 0) {
            let currentId = location.pathname.split('/ingredients/')[1];
            let current = ingredientsList.filter((item: TIngredient) => item._id === currentId);
            if (current.length > 0) {
                dispatch(updateCurrentIngredient(current[0]))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredientsListRequest, ingredientsListFailed, ingredientsList])

    return (
        <>
            <div className={`${ingredientDetailsStyles.header}`}>
                <p className={`${ingredientDetailsStyles.title} ml-10 mt-10 text text_type_main-large`}>Детали ингредиента</p>
            </div>

            {currentIngredient && <div data-testid="ingredient-details" className={`${ingredientDetailsStyles.ingredient} mb-15`}>
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
            </div>}
        </>
    );
}

export default IngredientDetails;