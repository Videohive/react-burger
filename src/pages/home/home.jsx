import styles from "./home.module.css";
import { useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export function HomePage() {
  const { isLoaded, hasError, ingredients } = useSelector(
    (store) => store.data
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
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
