import style from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';

const ConstructorItem = ({item}) => (
  <div className={style.dragItem}>
      <div className="mr-6" style={{width: '32px'}}>
          <DragIcon type="primary" />
      </div>
      <div style={{width: '100%'}}>
          <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
              style={{with: '100%'}}
          />
      </div>
  </div>
);

ConstructorItem.prototype = {
  item: PropTypes.shape(ingredientsPropTypes).isRequired
}

const BurgerConstructor = ({items}) => {
    const firstItem = items[0];
    const lastItem = items[items.length-1];
    const actionItems = items.slice(1,-1);

    const orderSum = (items, cost) => {
        return items.reduce((a,b) => {
            return a + b[cost];
        },0)
    };

    const ttlPrice = orderSum(items, 'price');
    return (
        <div className={style.sideMenu + ' mt-25'}>
                <div className="ml-8 pl-6">
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={firstItem.name}
                        price={firstItem.price}
                        thumbnail={firstItem.image_mobile}
                    />
                </div>
                <div className={style.wrapData}>
                    {actionItems.map((item,index) => <ConstructorItem item={item} key={index}/>)}
                </div>
                <div className="ml-8 pl-6">
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={lastItem.name}
                        price={lastItem.price}
                        thumbnail={lastItem.image_mobile}
                    />
                </div>
            <section className={`${style.orderProceed} mt-7 mb-7`}>
                <span className={`${style.price} m-1 text text_type_digits-default mr-10`}>
                    <span className="pr-3">{ttlPrice}</span>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>

        </div>
    );
}

BurgerConstructor.prototype = {
    items: PropTypes.arrayOf(ingredientsPropTypes).isRequired
}

export default BurgerConstructor;
