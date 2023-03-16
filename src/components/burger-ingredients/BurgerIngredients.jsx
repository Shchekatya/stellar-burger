import bIng from "../burger-ingredients/burger-ingredients.module.css";
import Ingredients from "../ingredients/ingredients";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from 'react'



export const BurgerIngredients = (props) => {
  const items = useSelector((state) => state.loadIngredients.items);

  const links = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle(
              "tab_type_current",
              link.getAttribute("href").replace("#", "") === entry.target.id
            );
          });
        }
        // console.log(entry.target.id)
      });
    },
    {
      root: document.querySelector("#viewport"),
      threshold:0.5,
    }
  );
  document
    .querySelectorAll(".section")
    .forEach((section) => observer.observe(section));

    const [current, setCurrent] = React.useState('section-bun')
    
console.log(current)
  return (
    <div className={bIng.left}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <nav className={bIng.nav}>
      <Tab value="section-bun" active={current === 'section-bun'} onClick={setCurrent} >
      <a
          href="#section-bun"
          className="text text_type_main-small pb-4 pt-4 nav-link"
        >
          Булки
        </a>
      </Tab>
      <Tab value="section-sauces" active={current === 'section-sauces'} onClick={setCurrent}>
      <a
          href="#section-sauces"
          className="text text_type_main-small pb-4 pt-4 nav-link"
        >
          Соусы
        </a>
      </Tab>
      <Tab value="section-mains" active={current === 'section-mains'} onClick={setCurrent} className="nav-link">
      <a
          href="#section-mains"
          className="text text_type_main-small pb-4 pt-4 nav-link"
        >
          Начинки
        </a>
      </Tab>
    </nav>
      {/* <nav className={bIng.nav}>
        <a
          href="#section-bun"
          className="text text_type_main-small pb-4 pt-4 nav-link"
        >
          Булки
        </a>
        <a
          href="#section-sauces"
          className="text text_type_main-small pb-4 pt-4 nav-link"
        >
          Соусы
        </a>
        <a
          href="#section-mains"
          className="text text_type_main-small pb-4 pt-4 nav-link"
        >
          Начинки
        </a>
      </nav> */}
      <div className={bIng.ingredients} id="viewport">
        <section id="section-bun" className="section">
          <h2 className="text text_type_main-medium mt-10 mb-6" id="buns">
            Булки
          </h2>
          <Ingredients type="bun" items={items} onAdd={props.onAdd} />
        </section>
        <section id="section-sauces" className="section">
          <h2 className="text text_type_main-medium mt-10 mb-6" id="sauces">
            Соусы
          </h2>
          <Ingredients type="sauce" items={items} onAdd={props.onAdd} />
        </section>
        <section id="section-mains" className="section">
          <h2 className="text text_type_main-medium mt-10 mb-6" id="mains">
            Начинки
          </h2>
          <Ingredients type="main" items={items} onAdd={props.onAdd} />
        </section>
      </div>
    </div>
  );
};
