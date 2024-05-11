import "./app.module.css";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const dispatch = useDispatch();
  const { isLoaded, hasError, ingredients } = useSelector(
    (store) => store.data
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main>
          {!isLoaded ? (
            <p>Загружаем...</p>
          ) : (
            <>
              {!hasError && ingredients && <BurgerIngredients />}
              {!hasError && ingredients && <BurgerConstructor />}
            </>
          )}
        </main>
      </DndProvider>
    </>
  );
}
