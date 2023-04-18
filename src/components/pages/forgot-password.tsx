import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/register.module.css";
import { forgot } from "../../services/actions/forgot";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { EMAIL_TO_FORGOT } from "../../services/actions/profile-actions";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";

export function Forgot() {
  const [email, setEmail] = React.useState("");
  const location = useLocation();
  const user = useSelector((state) => state.login);
  const response = useSelector((state) => state.login.name); 
  console.log(user)
  const dispatch = useAppDispatch();
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
const emailToPassword=()=> {
  dispatch({
    type: EMAIL_TO_FORGOT,
    payload: email,
  });
}

  if (response === "Reset email sent") {
    return <Navigate to="/reset-password" state={location} />;
  }

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(forgot(email));
          emailToPassword()
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
