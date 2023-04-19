import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/profile.module.css";
import { getUser } from "../../services/actions/get-user";
import { updateUser } from "../../services/actions/update-user";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";


export function ProfileInfo() {
    const user = useSelector((state) => state.login);
    const isLogged = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch(); 

    React.useEffect(() => {
        dispatch(getUser());
        getUser();
      }, []);
    
      const [value, setValue] = React.useState(user.name);
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
      const [login, setLogin] = React.useState(user.email);
      const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value); 
      };
      const [pass, setPass] = React.useState(user.password);
      const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value); 
      };
    return (
<form
className={styles.form}
onSubmit={(e) => {
  e.preventDefault();      
  dispatch(updateUser(value, login, pass))
}}
>
<div className={styles.formwrap}>
  <Input
    type={"text"}
    placeholder={"Имя"}
    onChange={onChange}
    icon={"EditIcon"}
    value={value}
    name={"name"}
    error={false}
    errorText={"Ошибка"}
    size={"default"}
    extraClass="mb-6"
  />
  <EmailInput
    onChange={onChangeLogin}
    value={login}
    name={"email"}
    placeholder="Логин"
    isIcon={true}
    extraClass="mb-6"
  />
  <PasswordInput
    onChange={onChangePass}
    value={pass}
    name={"password"}
    icon="EditIcon"
    extraClass="mb-6"
  />
  <Button htmlType="submit" type="primary" size="small">
    Сохранить измнения
  </Button>
</div>
</form>
    )
}

