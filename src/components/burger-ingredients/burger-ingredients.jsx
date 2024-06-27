import style from "./burger-ingredients.module.css";
import React, {useRef, useState} from 'react'
import Ingredient from '../ingredient/ingredient';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/types";
import { selectIngredient } from "../../services/actions/ingredient-details";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.data.ingredients);
  const buns = ingredients.filter((item) => item.type === "bun");
  const mains = ingredients.filter((item) => item.type === "main");
  const sauces = ingredients.filter((item) => item.type === "sauce");

  const [activeTab, setActiveTab] = useState('bun');

  const scrollContainerRef = useRef(null);
  const bunsSectionRef = useRef(null);
  const saucesSectionRef = useRef(null);
  const mainsSectionRef = useRef(null);

  const handleTabChange = (newTab) => {
    if(newTab !== activeTab) {
      setActiveTab(newTab);
      const sectionRef = newTab === 'bun' ? bunsSectionRef : newTab === 'sauce' ? saucesSectionRef : mainsSectionRef;
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTab = () => {
    const scrollPosition = scrollContainerRef.current.getBoundingClientRect().top;
    const bunsPosition = bunsSectionRef.current.getBoundingClientRect().top;
    const saucesPosition = saucesSectionRef.current.getBoundingClientRect().top;
    const mainsPosition = mainsSectionRef.current.getBoundingClientRect().top;

    const distanceToBuns = Math.abs(scrollPosition - bunsPosition);
    const distanceToSauces = Math.abs(scrollPosition - saucesPosition);
    const distanceToMains = Math.abs(scrollPosition - mainsPosition);

    if (distanceToBuns < distanceToSauces && distanceToBuns < distanceToMains && activeTab !== 'bun') {
      return setActiveTab('bun');
    }
    if (distanceToSauces < distanceToBuns && distanceToSauces < distanceToMains && activeTab !== 'sauce') {
      return setActiveTab('sauce');
    }
    if (distanceToMains < distanceToBuns && distanceToMains < distanceToSauces && activeTab !== 'main') {
      return setActiveTab('main');
    }
  };

  function handleClickIngredient(ingredient) {
    dispatch(selectIngredient(ingredient));
  }

  return (
    <>
    <section className={`${style.main} mr-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={style.navigation}>
        <Tab value="bun" active={activeTab === 'bun'} onClick={() => handleTabChange('bun')}>Булки</Tab>
        <Tab value="sauce" active={activeTab === 'sauce'} onClick={() => handleTabChange('sauce')}>Соусы</Tab>
        <Tab value="main" active={activeTab === 'main'} onClick={() => handleTabChange('main')}>Начинки</Tab>
      </div>
      <div className={`${style.contentWrap} mt-10 mb-10`} id='scrollPoint' ref={scrollContainerRef} onScroll={handleScrollToTab}>
        <div className={style.ingredientWrap} data-test="ingredients">
          <div className={style.ingredientWrap} data-test="bun">
          <h2 className="text text_type_main-medium mb-6" id='bun' ref={bunsSectionRef}>Булки</h2>
          <div className={style.ingredientWrap} data-test="content">
          {buns.map((data) => <Ingredient key={data._id} data={data} onSelect={handleClickIngredient}/>)}
          </div>
          </div>
          <h2 className="text text_type_main-medium mb-6" id='sauce' ref={saucesSectionRef}>Соусы</h2>
          {sauces.map((data) => <Ingredient key={data._id} data={data} onSelect={handleClickIngredient}/>)}
          <h2 className="text text_type_main-medium mb-6" id='main' ref={mainsSectionRef}>Начинки</h2>
          {mains.map((data) => <Ingredient key={data._id} data={data} onSelect={handleClickIngredient}/>)}
        </div>
      </div>
    </section>
    </>
  )
};

export default BurgerIngredients;
