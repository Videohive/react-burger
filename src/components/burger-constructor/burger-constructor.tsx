import style from "./burger-constructor.module.css";
import React, { useMemo, useEffect } from "react";
import ConstructorItem from "../constructor-item/constructor-item";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/use-modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/types";
import { useDrop } from "react-dnd";
import { addIngredient, addBun } from "../../services/actions/ingredients";
import { makeOrder } from "../../services/actions/order";
import { getUser } from "../../services/actions/profile";
import { TConstructorItem, TIngredient } from "../../utils/types";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const { isModalOpen, openModal, closeModal } = useModal();
  const ingredients = useSelector((store) => store.ingredients);
  const { bun, main } = ingredients;
  const allIngredients = useSelector((store) => store.data.ingredients);

  const orderSum = useMemo(() => {
    return (
      0 +
      (ingredients.bun ? ingredients.bun.price * 2 : 0) +
      (ingredients.main && ingredients.main.length > 0
        ? ingredients.main.reduce((acc: any, e: TConstructorItem) => {
            return e.price + acc;
          }, 0)
        : 0)
    );
  }, [ingredients]);

  function createOrder() {
    //console.log(isAuthenticated)
    if (isAuthenticated) {
      if (bun) {
        dispatch(makeOrder([...main, bun]));
        openModal();
      }
    } else {
      navigate("/login");
    }
  }

  const [, drop] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      const itemId = allIngredients.findIndex((e) => e._id === item._id);
      if (itemId !== -1) {
        const ingredient = allIngredients[itemId];
        if (ingredient.type === "bun") {
          dispatch(addBun(ingredient)); // Используем функцию-криэйтор для добавления булочки
        } else {
          dispatch(addIngredient(ingredient)); // Используем функцию-криэйтор для добавления ингредиента
        }
      } else {
        console.error("Элемент не найден");
      }
    },
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div ref={drop} className={style.sideMenu + " mt-25"}>
      <div className="ml-6 pl-6">
        {bun && (
          <ConstructorItem
            item={{ ...bun, isLocked: true }}
            key={bun.uuid}
            isTop={true}
          />
        )}
      </div>
      <div className={style.wrapData}>
        {main.map((item: TConstructorItem, index: number) => (
          <ConstructorItem item={item} key={item.uuid} position={index} />
        ))}
      </div>
      <div className="ml-6 pl-6">
        {bun && (
          <ConstructorItem
            item={{ ...bun, isLocked: true }}
            key={bun.uuid}
            isBottom={true}
          />
        )}
      </div>
      <section className={`${style.orderProceed} mt-7 mb-7 pr-4`}>
        <span
          className={`${style.price} m-1 text text_type_digits-default mr-10`}
        >
          <span className="pr-3">{orderSum}</span>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          noValidate={true}
          type="primary"
          size="medium"
          onClick={createOrder}
          disabled={
            !ingredients.bun || ingredients.main.length < 1 ? true : false
          }
        >
          Оформить заказ
        </Button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    </div>
  );
};

export default BurgerConstructor;
