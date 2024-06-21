import style from './constructor-item.module.css';
import React, { useRef, FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from "../../services/types";
import { CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_SORT_INGREDIENT } from '../../services/actions';
import { sortIngredientAction, removeIngredientAction } from '../../services/actions/constructor-item';
import { useDrop, useDrag } from 'react-dnd';
import { TConstructorItem } from '../../utils/types';

export interface ConstructorItemProps {
  item: TConstructorItem;
  position?: number;
  isTop?: boolean;
  isBottom?: boolean;
}

const ConstructorItem: FC<ConstructorItemProps> = ({ item, position = 0, isTop = false, isBottom = false }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (!item.isLocked) {
      dispatch(removeIngredientAction(item.uuid));
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  const [, dragRef] = useDrag({
    type: 'sort',
    item: { id: item._id, position },
    canDrag: !item.isLocked
  });

  const [, dropRef] = useDrop({
    accept: 'sort',
    drop(droppedItem: { id: string; position: number }) {
      if (position !== droppedItem.position) {
        dispatch(sortIngredientAction(position, droppedItem.position));
        // dispatch({ type: CONSTRUCTOR_SORT_INGREDIENT, from: position, to: droppedItem.position });
      }
    }
  });

  if (!item.isLocked) {
    dragRef(dropRef(ref));
  }

  return (
    <div className={style.dragItem} ref={item.type !== 'bun' ? ref : null}>
      {!item.isLocked && (
        <div className={`${style.cursorMove} mr-6`}>
          <DragIcon type="primary" />
        </div>
      )}
      <div className={style.dragItemElement}>
        <ConstructorElement
          type={isTop ? 'top' : (isBottom ? 'bottom' : undefined)}
          isLocked={item.isLocked}
          text={item.name + (isTop ? " (верх)" : (isBottom ? " (низ)" : ""))}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default ConstructorItem;
