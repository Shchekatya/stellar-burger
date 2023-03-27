import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import styles from "../pages/register.module.css";
import { sendRegister } from "../../services/actions/send-register";
import { Navigate } from "react-router-dom";

export function Register() {
  const user = useSelector((state) => state.login);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value); 
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  if (isLogged) {
    return <Navigate to='/login' />;
  }
  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(sendRegister(value, pass, name));
        }}
      >
        <h1>Регистрация</h1>
        <div className={styles.inputs}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={name}
            onChange={onChangeName}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
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
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}
