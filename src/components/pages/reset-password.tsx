import React from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate } from "react-router-dom";
import { reset } from "../../services/actions/reset";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";


export function Reset() {
  const user = useSelector((state) => state.login);
  const response = useSelector((state) => state.login.name);

  const [code, setCode] = React.useState("");
  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);  
  };
  const [pass, setPass] = React.useState("");
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const dispatch = useAppDispatch();
  if (response === "Password successfully reset") {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(reset(code, pass));
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
