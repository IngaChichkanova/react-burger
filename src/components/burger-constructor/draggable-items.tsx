import { FC, HTMLAttributes } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { TIngredient } from '../../utils/types';

type TDraggableProps = {
    currentItem: TIngredient;
    moveItem: Function;
} & HTMLAttributes<HTMLHtmlElement>;

const DraggableItem: FC<TDraggableProps> = ({ children, currentItem, className, moveItem }) => {
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
            drop: (item: {[prop in string]: TIngredient}, monitor: DropTargetMonitor<unknown, unknown>): void => {
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