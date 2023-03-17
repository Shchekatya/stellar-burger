import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER } from "../../services/actions/profile-actions";
import { BASE_URL } from "../../utils/api";
import { checkResponse } from "../../utils/check-response";
import { useNavigate } from "react-router-dom";
import styles from "../pages/register.module.css";

export function Register() {
  const user = useSelector((state) => state.login);

  const sendRegister = async (
    url = `${BASE_URL}/auth/register`,
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

      checkResponse(response);
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };

  const dispatch = useDispatch();
  const registerUser = (user) => {
    dispatch({
      type: REGISTER,
      payload: user,
    });
  };

  const [value, setValue] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    user.email = e.target.value;
  };
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
  };
  const onChangeName = (e) => {
    setName(e.target.value);
    user.name = e.target.value;
  };
  // console.log(user.isLoggedIn)
  const navigate = useNavigate();
  if (user.isLoggedIn) {
    return navigate("/login");
  }
  return (
    <div className={styles.wrapper}>
      <form>
        <h1>Регистрация</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
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
        <Button
          htmlType="button"
          type="primary"
          size="small"
          onClick={() => {
            registerUser(user);
            sendRegister();
          }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
}
