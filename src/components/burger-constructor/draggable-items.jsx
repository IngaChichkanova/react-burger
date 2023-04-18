import React from 'react';
import PropTypes from 'prop-types';
import { ingredientListPropTypes } from '../../utils/prop-types';
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ children, currentItem, className, moveItem, curentId, currentIndex }) => {

   // const originalIndex = findItem(index1).index
   // const originalItem = findItem(index1).item
   // console.log('originalIndex: ', originalIndex)
  //  console.log('id: ', id)

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'sort',
            item: (item) => {
               // console.log('useDrag',currentItem, curentId, currentIndex, item)
                return ({currentItem})
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item) => {
                console.log('useDrag end', item, curentId, currentIndex,  currentItem)
            },
        }),
        [curentId, currentIndex, moveItem],
    )

    const [, drop] = useDrop(
        () => ({
            accept: 'sort',
            drop: (item, monitor) => {
                console.log(item.currentItem.in, currentItem.in)
                if (item.currentItem.in !== currentItem.in && monitor.isOver({ shallow: true })) {
                   moveItem(item.currentItem.in, currentIndex, item.currentItem.it, currentItem.it)
                } 
            },
        }),
        [moveItem],
    )

    /*const [{ isDragging }, drag] = useDrag(
         () => ({
             type: 'sort',
             item: { id, originalIndex },
             collect: (monitor) => ({
                 isDragging: monitor.isDragging(),
             }),
             end: (item, monitor) => {
                 const { id: droppedId, originalIndex } = item;
                 const didDrop = monitor.didDrop();
                 //moveItem(droppedId, originalIndex, findItem(id, index).item)
                 if (!didDrop) {
                     moveItem(droppedId, originalIndex, originalItem)
                     // console.log('11111', droppedId, originalIndex)
                    // moveItem(droppedId, originalIndex)
                 }
             },
         }),
         [id, originalIndex, moveItem],
     )
 
     const [, drop] = useDrop(
         () => ({
             accept: 'sort',
             hover( { id: draggedId }) {
                 if (draggedId !== id) {
                   const { index: overIndex } = findItem(index1)
                 //  console.log(findItem(index1 + 1))
               //  console.log(index1, findItem(index1 + 1, findItem(index1 - 1)))
               console.log( item, item1)
                   moveItem(draggedId, overIndex, item1)
                 }
               },
         }),
         [findItem, moveItem],
     )*/


    // const opacity = isHover ? 0.7 : 1;
    const isDrag = false

    return (!isDrag &&
        <section
            className={className}
            ref={(node) => drag(drop(node))}
        // style={{ opacity }}
        >
            {children}
        </section>
    );
}

export default DraggableItem;

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
   // item: ingredientListPropTypes.isRequired,
    className: PropTypes.string.isRequired,
    // id: PropTypes.string.isRequired,
    //index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired
};