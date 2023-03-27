import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import appHeader from "../app-header/app-header.module.css";

export const AppHeader = () => {
  return (
    <nav>
      <div className={appHeader.left}>
        <Link to="/" className={appHeader.icon}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default, ml-2">Конструктор</p>
        </Link>
        <Link to="/" className={appHeader.icon}>
          <ListIcon type="primary" />
          <p className="text text_type_main-default, ml-2">Лента заказов</p>
        </Link>
      </div>
      <Logo />
      <NavLink to={"/profile"} className={appHeader.icon}>
        <ProfileIcon type="primary" />
        <p className="text text_type_main-default, ml-2"> Личный кабинет</p>
      </NavLink>
    </nav>
  );
};
