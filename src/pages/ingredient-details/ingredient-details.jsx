import styles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export function IngredientDetailsPage() {
  return (
    <main className={`${styles.container} mt-30`}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </main>
  );
}
