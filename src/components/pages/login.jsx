import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, NavLink } from "react-router-dom";
import styles from "../pages/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../services/actions/profile-actions";
import { setCookie } from "../../utils/cookie";

export function Login() {
  console.log(document.cookie);
  const user = useSelector((state) => state.login);
  let result;
  const sendLogin = async (
    url = "https://norma.nomoreparties.space/api/auth/login",
    data = user
  ) => {
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        result = await response.json();
        let authToken = result.accessToken.split("Bearer ")[1];
        let refreshToken = result.refreshToken;

        if (authToken) {
          setCookie("authToken", authToken);
          setCookie("refreshToken", refreshToken);

          console.log(document.cookie.split("refreshToken=")[1]);
          console.log(document.cookie);
        }
      } else {
        console.log("Ошибка HTTP: " + response.status + data);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };

  const dispatch = useDispatch();
  const loginUser = (user) => {
    dispatch({
      type: LOGIN,
      payload: user,
    });
  };

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
  if (document.cookie) {
    console.log('вы красавчик')
    return (<Navigate to='/'/>)
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1>Вход</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChangePass}
            value={pass}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="small"
          onClick={() => {
            loginUser(user);
            sendLogin();
          }}
        >
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
      {/* { document.cookie && <Navigate to='/'/>} */}
    </div>
  );
}
