import styles from "../pages/profile.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { logOut } from "../services/actions/logout";
import { useAppDispatch, useSelector } from "../services/hooks/hooks";


export function Profile() {


  const dispatch = useAppDispatch(); 

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
          to={"/profile/orders"}
          className="text text_type_main-medium p-4"
        >
          История заказов
        </NavLink>
        <NavLink
          to={"/login"}
          className="text text_type_main-medium p-4"
          onClick={() => dispatch(logOut())}
        >
          Выход
        </NavLink>
        <p className="text text_type_main-default mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
     <Outlet/>
    </div>
  );
}
