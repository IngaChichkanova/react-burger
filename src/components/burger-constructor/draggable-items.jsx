import React from 'react';
//import PropTypes from 'prop-types';
//import { ingredientListPropTypes } from '../../utils/prop-types';
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ children, item, className, index, moveItem, id }) => {
    const ref = React.useRef(null);


    const [{ handlerId }, drop] = useDrop({
        accept: 'sort',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            console.log(item)
            moveItem(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    });


    const [{ }, drag] = useDrag({
        type: 'sort',
        item: () => {
            return { item, index }
        },
        collect: monitor => ({

        })
    });

    drag(drop(ref));

    return (
        <section className={className} ref={ref} >
            {children}
        </section>
    );
}

export default DraggableItem;

//DraggableItem.propTypes = {
   // ingredientsList: PropTypes.arrayOf(ingredientListPropTypes).isRequired
//};