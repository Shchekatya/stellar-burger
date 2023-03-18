import React from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useReset } from "../../services/actions/reset";

export function Reset() {
  const location = useLocation();
  const fromPage = location.state.pathname || "/";
  const user = useSelector((state) => state.login);
  const [code, setCode] = React.useState("");
  const onChangeCode = (e) => {
    setCode(e.target.value);
    user.name = e.target.value;
  };
  const [pass, setPass] = React.useState("");
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
  };
  const reset = useReset();
  const dispatch = useDispatch();
  if (fromPage !== "/forgot-password") {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(reset);
        }}
      >
        <h1>Сбросить пароль</h1>
        <PasswordInput
          onChange={onChangePass}
          placeholder={"Введите новый пароль"}
          value={pass}
          name={"password"}
          extraClass="mb-2"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChangeCode}
          value={code}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="small">
          Изменить пароль
        </Button>
      </form>
    </div>
  );
}
