import style from './burger-constructor.module.css';
import React, { useMemo } from 'react';
import ConstructorItem from '../constructor-item/constructor-item';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/IngredientsTypes';

const BurgerConstructor = ({ data }) => {
  const { bun, ingredients } = useMemo(() => {
      return {
          bun: data.find(item => item.type === 'bun'),
          ingredients: data.filter(item => item.type !== 'bun'),
      };
  }, [data]);

  const orderSum = useMemo(() => {
    return ingredients.reduce(
      (acc, ingredient) => (acc += ingredient.price),
      bun?.price * 2 || 0
    );
  }, [ingredients, bun]);

  return (
      <div className={style.sideMenu + ' mt-25'}>
          <div className="ml-6 pl-6">
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={bun.name + " (верх)"}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
              />
          </div>
          <div className={style.wrapData}>
              {ingredients.map((item, index) => <ConstructorItem item={item} key={index}/>)}
          </div>
          <div className="ml-6 pl-6">
              <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={bun.name + " (низ)"}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
              />
          </div>
          <section className={`${style.orderProceed} mt-7 mb-7`}>
              <span className={`${style.price} m-1 text text_type_digits-default mr-10`}>
                  <span className="pr-3">{orderSum}</span>
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
  data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}

export default BurgerConstructor;
