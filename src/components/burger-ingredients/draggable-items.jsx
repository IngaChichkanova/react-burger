import React from 'react';
//import PropTypes from 'prop-types';
//import { ingredientListPropTypes } from '../../utils/prop-types';
import { useDrag } from "react-dnd";
import draggableItemsStyles from './draggable-items.module.css';

const DraggableItem = ({ type, children, item, clickHandler }) => {
    const [{ }, dragRef] = useDrag({
        type: type,
        item: () => {
            console.log('useDrag', item)
            return item
        },
        collect: monitor => ({

        })
    });

    return (
        <div
            ref={dragRef}
            className={`${draggableItemsStyles.ingredient} text text_type_main-small mt-6 ml-3 mr-3`}
            onClick={clickHandler}
        >
            {children}
        </div>
    );
}

export default DraggableItem;

//DraggableItem.propTypes = {
   // ingredientsList: PropTypes.arrayOf(ingredientListPropTypes).isRequired
//};