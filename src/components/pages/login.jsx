import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, } from "react-router-dom";
import styles from "../pages/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/actions/login";
import {useLocation, useNavigate,Navigate,  } from "react-router-dom";

export function Login() {
  const user = useSelector((state) => state.login);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const data = {
      email: user.email,
      password: user.password
  }
   const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [pass, setPass] = React.useState("");
  const navigate=useNavigate();
  const onChange = (e) => {
    setValue(e.target.value);
    user.email = e.target.value;
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
  };
  // if (isLogged) {
  //   return <Navigate to={fromPage} />;
  // }
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(loginUser(user, fromPage));
          if (isLogged) {
            navigate(fromPage)         
          }
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
