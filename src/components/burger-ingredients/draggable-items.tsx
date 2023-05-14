import { FC, HTMLAttributes } from 'react';
import { useDrag } from "react-dnd";
import { TIngredient } from '../../utils/types';

type TDraggableProps = {
    item: TIngredient;
    type: string;
} & HTMLAttributes<HTMLDivElement>;

const DraggableItem: FC<TDraggableProps> = ({ type, children, item, className }) => {
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
            style={{ opacity }}
        >
            {children}
        </div>
    );
}

export default DraggableItem;