import './app.module.css';
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor  from "../burger-constructor/burger-constructor";
import data from "../../utils/data";

export default function App() {
  const [state, setState] = useState({
    ingredients: [],
    hasError: false
  });

  useEffect(() => {
    console.log(data)
    setState(prevState => ({ ...prevState, ingredients: data, hasError: true }));
  }, []);

  return (
    <>
      <AppHeader />
      <main>
      {state.hasError &&<BurgerIngredients ingredients={state.ingredients} />}
      <BurgerConstructor items={data} />
      </main>
    </>
  );
}
