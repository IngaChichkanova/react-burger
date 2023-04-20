import React from 'react';
import PropTypes from 'prop-types';
import { ingredientListPropTypes } from '../../utils/prop-types';
import { useDrag } from "react-dnd";

const DraggableItem = ({ type, children, item, clickHandler, className }) => {
    const [{ isDrag }, dragRef] = useDrag({
        type: type,
        item: () => item,
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const opacity = isDrag ? 0.3 : 1;

    return (
        <div
            ref={dragRef}
            className={className}
            onClick={clickHandler}
            style={{ opacity }}
        >
            {children}
        </div>
    );
}

export default DraggableItem;

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    item: ingredientListPropTypes.isRequired,
    className: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};