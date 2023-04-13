import React from 'react';
//import PropTypes from 'prop-types';
//import { ingredientListPropTypes } from '../../utils/prop-types';
import { useDrop } from "react-dnd";

const DropTarget = ({ type, children, onDropHandler }) => {
    const [{ }, dropTarget] = useDrop({
        accept: "bun",
       // drop(itemId) {
      //      onDropHandler(itemId);
      //  },
        drop: (item) => console.log(item), 
        collect: monitor => ({

        }),
        hover: (item, monitor) => {
            // works fine and prints the correct data
            console.log(item);
            console.log(monitor.canDrop()) // true
       },
    });

    return (
        <div
            ref={dropTarget}
        >
            {children}
        </div>
    );
}

export default DropTarget;

//DropTarget.propTypes = {
   // ingredientsList: PropTypes.arrayOf(ingredientListPropTypes).isRequired
//};