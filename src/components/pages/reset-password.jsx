import React from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function Reset() { 
  const user = useSelector((state) => state.login);
  const [code, setCode] = React.useState('');
  const onChangeCode = (e) => {
    setCode(e.target.value);    
  };
  const [pass, setPass] = React.useState("");
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
  };

  let result;
  const reset = async (
    url = "https://norma.nomoreparties.space/api/password-reset/reset",
    data =  {
        password: pass,
        token: code   
  } 
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
        setCode(result.message);
      } else {
        console.log("Ошибка HTTP: " + response.status + data);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };
  if (code==='Password successfully reset') {
    return ( <Navigate to='/login'/>)
  }
  return (
    <div>
      <form>
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
          <Button
            htmlType="button"
            type="primary"
            size="small"
            onClick={() =>reset() }
          >
            Изменить пароль
          </Button>
      </form>
    </div>
  );
}
