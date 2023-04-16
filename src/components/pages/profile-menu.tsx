import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/profile.module.css";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { logOut } from "../../services/actions/logout";
import { getUser } from "../../services/actions/get-user";
import { updateUser } from "../../services/actions/update-user";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";
import { useDispatch } from "react-redux";
import { OutgoingMessage } from "http";

export function Profile() {


  const dispatch = useAppDispatch(); 

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <NavLink
          to={"/profile"}
          className="text text_type_main-medium p-4 current"
        >
          Профиль
        </NavLink>
        <NavLink
          to={"/profile/orders"}
          className="text text_type_main-medium p-4"
        >
          История заказов
        </NavLink>
        <NavLink
          to={"/login"}
          className="text text_type_main-medium p-4"
          onClick={() => dispatch(logOut())}
        >
          Выход
        </NavLink>
        <p className="text text_type_main-default mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
     <Outlet/>
    </div>
  );
}
