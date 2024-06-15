import styles from "./home.module.css";
import { useSelector } from "../../services/types";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export function HomePage() {
  const { isLoading, hasError, ingredients } = useSelector(
    (store) => store.data
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          {isLoading ? (
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
