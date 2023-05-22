import bIng from "../burger-ingredients/burger-ingredients.module.css";
import Ingredients from "../ingredients/ingredients";
import PropTypes from "prop-types";
import { useSelector } from "../../services/hooks/hooks";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useInView } from "react-intersection-observer";
import {TItem} from '../ingredients/ingredient-single'

export const BurgerIngredients = () => {
  const items = useSelector((state) => state.loadIngredients.items);
  const [currentTab, setCurrentTab] = React.useState("buns");

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("buns");
    } else if (inViewSauces) {
      setCurrentTab("sauces");
    } else if (inViewFilling) {
      setCurrentTab("mains");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab:any) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={bIng.left}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <nav className={bIng.nav}>
        <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={onTabClick}
        >
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </nav>

      <div className={bIng.ingredients} id="viewport">
        <section id="buns" className="section" ref={bunsRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <Ingredients type="bun" items={items} />
        </section>
        <section id="sauces" className="section" ref={saucesRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <Ingredients type="sauce" items={items} />
        </section>
        <section id="mains" className="section" ref={mainsRef}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <Ingredients type="main" items={items}  />
        </section>
      </div>
    </div>
  );
};
