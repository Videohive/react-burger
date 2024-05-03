import style from "./burger-ingredients.module.css";
import Ingredient from '../ingredient/ingredient';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import IngredientsTypes from "../../utils/IngredientsTypes";

const BurgerIngredients = ({ingredients}) =>
{
    const ingredientsGroup = Object.groupBy(ingredients, ({type}) => type);
    return (
        <section className={`${style.main} mr-10`}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={style.navigation}>
                <Tab value="one" active={true} onClick={()=>{}}>Булки</Tab>
                <Tab value="two" active={false} onClick={()=>{}}>Соусы</Tab>
                <Tab value="three" active={false} onClick={()=>{}}>Начинки</Tab>
            </div>
            <div className={`${style.contentWrap} mt-10 mb-10`}>
                <div className={style.ingredientWrap}>
                    <h2 className="text text_type_main-medium mb-6">Булки</h2>
                    {ingredientsGroup.bun.map((data, index) => <Ingredient key={index} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                    {ingredientsGroup.sauce.map((data, index) => <Ingredient key={index} data={data}/>)}
                    <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                    {ingredientsGroup.main.map((data, index) => <Ingredient key={index} data={data}/>)}
                </div>
            </div>
        </section>
    )
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientsTypes.isRequired).isRequired
};

export default BurgerIngredients;
