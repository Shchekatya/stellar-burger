import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, } from "react-router-dom";
import styles from "../pages/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUser } from "../../services/actions/login";

export function Login() {
  const user = useSelector((state) => state.login);
  const loginUser = useLoginUser();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [pass, setPass] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    user.email = e.target.value;
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
  };
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(loginUser);
        }}
      >
        <h1>Вход</h1>
        <div className={styles.inputs}>
          <EmailInput
            onChange={onChange}
            value={user.email}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChangePass}
            value={user.password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button htmlType="submit" type="primary" size="small">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-small">
        Вы — новый пользователь?{" "}
        <NavLink to={"/register"}>Зарегистрироваться</NavLink>
      </p>
      <p className="text text_type_main-small">
        {" "}
        Забыли пароль?{" "}
        <NavLink to={"/forgot-password"}>Восстановить пароль</NavLink>
      </p>
    </div>
  );
}
