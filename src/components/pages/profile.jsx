import React from "react";
import {EmailInput  } from "@ya.praktikum/react-developer-burger-ui-components";

export function Profile() {
    const [value, setValue] = React.useState('bob@example.com')
    const onChange = e => {
      setValue(e.target.value)
    }
return (
  <div>
    <form>
      <h1>Профиль</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
  <EmailInput
    onChange={onChange}
    value={value}
    name={'email'}
    placeholder="Логин"
    isIcon={true}
    extraClass="mb-2"
  />
  <EmailInput
    onChange={onChange}
    value={value}
    name={'email'}
    placeholder="Логин"
    isIcon={true}
    extraClass="mb-2"
  />
  <EmailInput
    onChange={onChange}
    value={value}
    name={'email'}
    placeholder="Логин"
    isIcon={true}
    extraClass="mb-2"
  />
 
</div>
    </form>
  </div>
);
} 