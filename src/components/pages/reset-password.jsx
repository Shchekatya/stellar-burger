import React from "react";
import {
   Input,
   Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Reset() {
  const [email, setEmail] = React.useState('введите email');
  const onChangeEmail = (e) => {
    setEmail(e.target.value);    
  };

  let result;
  const reset = async (
    url = "https://norma.nomoreparties.space/api/password-reset",
    data = {
      email: email
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
       console.log(result)
      } else {
        console.log("Ошибка HTTP: " + response.status + data);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };
  return (
    <div>
      <form>
        <h1>Сбросить пароль</h1>
        <Input
            type={"text"}
            placeholder={"Имя"}
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
            onClick={() =>reset() }
          >
            Изменить пароль
          </Button>
      </form>
    </div>
  );
}
