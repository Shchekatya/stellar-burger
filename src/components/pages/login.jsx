import React from "react";
import {EmailInput,PasswordInput, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from "../pages/login.module.css";


export function Login() {
 
        const [value, setValue] = React.useState('')
        const [pass, setPass] = React.useState('')
        const onChange = e => {
          setValue(e.target.value)
        }
        const onChangePass = e => {
            setPass(e.target.value)
          }
    return (
      <div className={styles.wrapper}>
        <form>
          <h1>Вход</h1>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      <EmailInput 
        onChange={onChange}
        value={value}
        name={'email'}
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChangePass}
        value={pass}
        name={'password'}
        extraClass="mb-2"
      />
    </div>
    <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
  Войти
</Button>
        </form>
        <p className="text text_type_main-small">Вы — новый пользователь? <NavLink to={'/register'}>Зарегистрироваться</NavLink></p>
        <p className="text text_type_main-small"> Забыли пароль? <NavLink to={'/forgot-password'}>Восстановить пароль</NavLink></p>
      </div>
    );
  } 