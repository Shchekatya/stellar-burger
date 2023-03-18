import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/profile.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogOut } from "../../services/actions/logout";
import { getUser } from "../../services/actions/get-user";
import { useUpdateUser } from "../../services/actions/update-user";

export function Profile() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch(); 
  const logOut=useLogOut();
  const updateUser=useUpdateUser();

  React.useEffect(() => {
    dispatch(getUser());
    getUser();
  }, []);

  const [value, setValue] = React.useState(user.name);
  const onChange = (e) => {
    setValue(e.target.value);
    user.name = e.target.value;
  };
  const [login, setLogin] = React.useState(user.email);
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
    user.email = e.target.value;
  };
  const [pass, setPass] = React.useState("");
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
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
          onClick={() => dispatch(logOut)}
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
          dispatch(updateUser)
        }}
      >
        <div className={styles.formwrap}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={user.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={onChangeLogin}
            value={user.email}
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChangePass}
            value={user.password}
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
