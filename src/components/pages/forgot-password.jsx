import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate } from "react-router-dom";

export function Forgot() {
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  let result;
  const reset = async (
    url = "https://norma.nomoreparties.space/api/password-reset",
    data = {
      email: email,
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
        setEmail(result.message);   
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };

  if (email==='Reset email sent') {
   return <Navigate to='/reset-password'/>
   }

  return (
  
    <div>
      <form>
        <h1>Восстановить пароль</h1>
        <Input
          type={"text"}
          placeholder={"введите email"}
          onChange={onChangeEmail}
          icon={"EditIcon"}
          value={email}
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
          onClick={() => reset()}
        >
          Восстановить
        </Button>
      </form>
    </div>
  );
}
