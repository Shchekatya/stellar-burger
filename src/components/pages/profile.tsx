import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/profile.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { logOut } from "../../services/actions/logout";
import { getUser } from "../../services/actions/get-user";
import { updateUser } from "../../services/actions/update-user";
import { getCookie } from "../../utils/cookie";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

export function Profile() {
  const user = useSelector((state) => state.login);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch(); 

  React.useEffect(() => {
    dispatch(getUser());
    getUser();
  }, []);

  const [value, setValue] = React.useState(user.name);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [login, setLogin] = React.useState(user.email);
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value); 
  };
  const [pass, setPass] = React.useState(user.password);
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value); 
  };

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
          to={"/profile/order"}
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
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();      
          dispatch(updateUser(value, login, pass))
        }}
      >
        <div className={styles.formwrap}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={onChangeLogin}
            value={login}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChangePass}
            value={pass}
            name={"password"}
            icon="EditIcon"
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="small">
            Сохранить измнения
          </Button>
        </div>
      </form>
    </div>
  );
}
