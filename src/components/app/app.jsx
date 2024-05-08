import './app.module.css';
import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from '../../utils/api';

export default function App() {
  const [state, setState] = useState({
    ingredients: [],
    isLoading: true,
    hasError: false,
    errorMessage: ''
  });

  useEffect(() => {
    getIngredients()
      .then(data => {
        setState({
          ingredients: data.data,
          isLoading: false,
          hasError: false,
          errorMessage: ''
        });
      })
      .catch(error => {
        console.error("Ошибка при получении данных:", error);
        setState({
          ingredients: [],
          isLoading: false,
          hasError: true,
          errorMessage: error.message || 'Произошла ошибка при получении данных'
        });
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        {state.isLoading ? (
          <p>Loading...</p>
        ) : state.hasError ? (
          <p>Error: {state.errorMessage}</p>
        ) : (
          <>
            <BurgerIngredients ingredients={state.ingredients} />
            <BurgerConstructor data={state.ingredients} />
          </>
        )}
      </main>
    </>
  );
}
