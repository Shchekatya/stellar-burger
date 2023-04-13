import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, } from "react-router-dom";
import styles from "../pages/login.module.css";
import { loginUser } from "../../services/actions/login";
import {useLocation, useNavigate, Navigate} from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

export function Login() {
  const user = useSelector((state) => state.login);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation();
  const cookie=getCookie("authToken")
  
  const fromPage = location.state?.pathname || "/";
   const dispatch = useDispatch();
  const [value, setValue] = React.useState(user.email);
  const [pass, setPass] = React.useState(user.password);
  const navigate=useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    setValue(e.target.value);
  };
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  if (isLogged) {  
   return <Navigate to={fromPage   }   />
  }
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();        
          dispatch(loginUser(value,pass));             
        }}
      >
        <h1>Вход</h1>
        <div className={styles.inputs}>
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
