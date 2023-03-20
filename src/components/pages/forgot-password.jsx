import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/register.module.css";
import { forgot } from "../../services/actions/forgot";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export function Forgot() {
  const [email, setEmail] = React.useState("");
  const location = useLocation();
  const user = useSelector((state) => state.login);
  const response = useSelector((state) => state.login.name);
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    user.email = e.target.value;
  };

  const dispatch = useDispatch();
  if (response === "Reset email sent") {
    return <Navigate to="/reset-password" state={location} />;
  }

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(forgot(user));
        }}
      >
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
        <Button htmlType="submit" type="primary" size="small">
          Восстановить
        </Button>
      </form>
    </div>
  );
}
