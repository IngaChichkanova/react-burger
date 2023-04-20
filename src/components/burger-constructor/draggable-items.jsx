import React from 'react';
import PropTypes from 'prop-types';
import { ingredientListPropTypes } from '../../utils/prop-types';
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ children, currentItem, className, moveItem }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'sort',
            item: () => ({ currentItem }),
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            })
        }),
        [currentItem, moveItem],
    )

    const [{ isHover }, drop] = useDrop(
        () => ({
            accept: 'sort',
            collect: monitor => ({
                isHover: monitor.isOver(),
            }),
            drop: (item, monitor) => {
                if (item.currentItem.uniqueKey !== currentItem.uniqueKey && monitor.isOver({ shallow: true })) {
                    moveItem(item.currentItem.uniqueKey, currentItem.uniqueKey)
                }
            },
        }),
        [moveItem],
    )

    const opacity = isDragging ? 0.2 : 1;
    const filter = isHover ? 'brightness(1.75)' : 'none';

    return (
        <section
            className={className}
            ref={(node) => drag(drop(node))}
            style={{ opacity, filter }}
        >
            {children}
        </section>
    );
}

export default DraggableItem;

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    currentItem: ingredientListPropTypes.isRequired,
    className: PropTypes.string.isRequired,
    moveItem: PropTypes.func.isRequired
};