import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../pages/profile.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER,
  UPDATE_USER,
  LOGOUT_USER,
} from "../../services/actions/profile-actions";
import { getCookie, setCookie } from "../../utils/cookie";

export function Profile() {
  const user = useSelector((state) => state.getUser);
  console.log(user);
  let cookie = getCookie("authToken");
  console.log(cookie);
  const dispatch = useDispatch();
  const getUser = (user) => {
    dispatch({
      type: GET_USER,
      payload: user,
    });
  };
  const logOutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
  };
  let result;
  const sendUpdate = async (
    url = "https://norma.nomoreparties.space/api/auth/user",
    data = user
  ) => {
    try {
      let response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        result = await response.json();
        console.log(data);
        getUser(data.user);
      } else {
        console.log("Ошибка HTTP: " + response.status + response.message);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };

  const refreshTokenRequest = async (
    url = "https://norma.nomoreparties.space/api/auth/token",
    data = {
      token: getCookie("refreshToken"),
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
        let authToken = result.accessToken.split("Bearer ")[1];
        let refreshToken = result.refreshToken;

        if (authToken) {
          setCookie("authToken", authToken);
          setCookie("refreshToken", refreshToken);
        }
      } else {
        console.log("Ошибка HTTP: " + response.status + response.message);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };

  const logOut = async (
    url = "https://norma.nomoreparties.space/api/auth/logout",
    data = {
      token: getCookie("refreshToken"),
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
        logOutUser();
        setCookie("authToken", null, { expires: -1 });
        setCookie("refreshToken", null, { expires: -1 });
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
    } catch (error) {
      console.log("АШИПКА!!", error);
    }
  };

  const updateUser = (user) => {
    dispatch({
      type: UPDATE_USER,
      payload: user,
    });
  };

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(
          "https://norma.nomoreparties.space/api/auth/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookie,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          // console.log(data.user)
          getUser(data.user);
        } else {
          console.log("Ошибка HTTP: " + res.status);
        }
      } catch (error) {
        if (error.message === "jwt expired") {
          await refreshTokenRequest();
        }
        console.log("АШИПКА!!", error);
      }
    };
    getUserData();
  }, []);

  const [value, setValue] = React.useState(user.name);
  const onChange = (e) => {
    setValue(e.target.value);
    user.name = e.target.value;
  };
  const [login, setLogin] = React.useState(user.email);
  const onChangeLogin = (e) => {
    setLogin(e.target.value);
    user.email = e.target.value;
  };
  const [pass, setPass] = React.useState("");
  const onChangePass = (e) => {
    setPass(e.target.value);
    user.password = e.target.value;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <NavLink
          to={"/profile"}
          className="text text_type_main-medium p-4 current"
        >
          Профиль
        </NavLink>
        <NavLink
          to={"/profile/order"}
          className="text text_type_main-medium p-4"
        >
          История заказов
        </NavLink>
        <NavLink
          to={"/login"}
          className="text text_type_main-medium p-4"
          onClick={() => logOut()}
        >
          Выход
        </NavLink>
        <p className="text text_type_main-default mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            icon={"EditIcon"}
            value={user.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={onChangeLogin}
            value={user.email}
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
          <Button
            htmlType="button"
            type="primary"
            size="small"
            onClick={() => {
              updateUser(user);
              sendUpdate();
            }}
          >
            Сохранить измнения
          </Button>
        </div>
      </form>
    </div>
  );
}
