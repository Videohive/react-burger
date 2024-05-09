import style from './constructor-item.module.css';
import { useRef } from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsPropTypes from '../../utils/IngredientsTypes';
import { useDispatch } from 'react-redux';
import { CONSTRUCTOR_REMOVE_INGREDIENT, CONSTRUCTOR_SORT_INGREDIENT } from '../../services/actions';
import { useDrop, useDrag } from 'react-dnd';

const ConstructorItem = ({ item, position = 0, isTop = false, isBottom = false }) => {
  const dispatch = useDispatch();

  const handleClose = (e) => {
    if (!item.isLocked) {
      dispatch({ type: CONSTRUCTOR_REMOVE_INGREDIENT, uuid: item.uuid });
      e.stopPropagation();
    }
  };

  const ref = useRef(null);

  const [, dragRef] = useDrag({
    type: 'sort',
    item: { id: item._id, position },
    canDrag: !item.isLocked
  });

  const [, dropRef] = useDrop({
    accept: 'sort',
    drop(droppedItem) {
      if (position !== droppedItem.position) {
        dispatch({ type: CONSTRUCTOR_SORT_INGREDIENT, from: position, to: droppedItem.position });
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
          type={isTop ? 'top' : (isBottom ? 'bottom' : null)}
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

ConstructorItem.propTypes = {
  item: ingredientsPropTypes.isRequired
}

export default ConstructorItem;

