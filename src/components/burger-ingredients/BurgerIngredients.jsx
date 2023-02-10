import bIng from "../burger-ingredients/burger-ingredients.module.css";
import Ingredients from "../ingredients/ingredients";
import PropTypes from 'prop-types';

export const BurgerIngredients = (props) => {
  return (
    <div className={bIng.left}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <nav className={bIng.nav}>
        <a href="#buns" className="text text_type_main-small pb-4 pt-4">
          Булки
        </a>
        <a href="#sauces" className="text text_type_main-small pb-4 pt-4">
          Соусы
        </a>
        <a href="#mains" className="text text_type_main-small pb-4 pt-4">
          Начинки
        </a>
      </nav>
      <div className={bIng.ingredients}>
        <h2 className="text text_type_main-medium mt-10 mb-6" id="buns">
          Булки
        </h2>
        <Ingredients type="bun" items={props.items} onAdd={props.onAdd} />
        <h2 className="text text_type_main-medium mt-10 mb-6" id="sauces">
          Соусы
        </h2>
        <Ingredients type="sauce" items={props.items} onAdd={props.onAdd} />
        <h2 className="text text_type_main-medium mt-10 mb-6" id="mains">
          Начинки
        </h2>
        <Ingredients type="main" items={props.items} onAdd={props.onAdd} />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.array
}; 