import style from './constructor-item.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';

const ConstructorItem = ({item}) => (
  <div className={style.dragItem}>
      <div className="mr-6">
          <DragIcon type="primary" />
      </div>
      <div className={style.dragItemElement}>
          <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
          />
      </div>
  </div>
);

ConstructorItem.prototype = {
  item: PropTypes.shape(ingredientsPropTypes.isRequired).isRequired
}

export default ConstructorItem;

