import React from "react";
import {EmailInput,Input,PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/profile.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER } from "../../services/actions/profile-actions";

export function Profile() {
  const user = useSelector((state) => state.getUser);
  console.log(user)
  let cookie=document.cookie.split('token=')[1]
  console.log(cookie)
  const dispatch = useDispatch();
  const update = (user) => {
    dispatch({
      type: GET_USER,
      payload: user,
    });
  };
 
 
 
   React.useEffect(() => {
     const getUserData = async () => {
      try {
           const res = await fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer "+cookie
            },
          
          });
           const data = await res.json();
           if (res.ok) {
            console.log(data.user)
            update(data.user)    
                   
         } else {
             console.log("Ошибка HTTP: " + res.status);  }        
         } catch (error) {
           console.log("АШИПКА!!", error);        
         }
       };
     getUserData();
   }, []);

    const [value, setValue] = React.useState(user.name)
    const onChange = e => {
      setValue(e.target.value)
    }
return (
  <div className={styles.wrapper}>
    <div className={styles.left}>
    <NavLink to={'/profile'} className="text text_type_main-medium p-4 current">Профиль</NavLink>
    <NavLink to={'/profile/order'} className="text text_type_main-medium p-4">История заказов</NavLink>
    <NavLink to={'/profile'} className="text text_type_main-medium p-4">Выход</NavLink>
    <p className="text text_type_main-default mt-20">В этом разделе вы можете изменить свои персональные данные</p>
    </div>
    <form className={styles.form}>       
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Input
      type={'text'}
      placeholder={'Имя'}
      onChange={e => setValue(e.target.value)}
      icon={'EditIcon'}      
      value={value}
      name={'name'}
      error={false}          
      errorText={'Ошибка'}
      size={'default'}
      extraClass="mb-6"
    />
   <EmailInput
    onChange={onChange}
    value={user.email}
    name={'email'}
    placeholder="Логин"
    isIcon={true}
    extraClass="mb-6"
  />
    <PasswordInput
        onChange={onChange}
        value={value}
        name={'password'}
        icon="EditIcon"
        extraClass="mb-6"
      />
<Button htmlType="button" type="primary" size="small" onClick={()=>{}}>
 Сохранить измнения
</Button>
 
</div>
    </form>
  </div>
);
} 