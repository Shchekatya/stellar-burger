import styles from "./app.module.css";
import { AppHeader } from "../app-header/AppHeader";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { Modal } from "../modal/Modal";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Router } from "react-router-dom";
import { Register } from "../pages/register";
import { Reset } from "../pages/reset-password";
import { Login } from "../pages/login";
import { Page404 } from "../pages/404";
import { MainBurgers } from "../pages/main-burgers";
import { Profile } from "../pages/profile";
import { Forgot } from "../pages/forgot-password";
import { ProtectedRouteElement } from "../../utils/protected-route";
import { useDispatch } from "react-redux";
import { SHOW_ITEM } from "../../services/actions/actions";
import { ModalSwitch } from "../modal/ModalSwitch";

const App = () => {


  return (
    <div className={styles.app}>
      <BrowserRouter>
        <header>
          <AppHeader />
        </header>
        <main>
          <Routes >                     
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />           
            <Route path="/reset-password" element={<Reset />} />
            <Route element={<ProtectedRouteElement />}>
              <Route path="/profile" element={<Profile />} />
            </Route>           
            <Route path="/forgot-password" element={<Forgot />} />
          </Routes>
          <ModalSwitch/>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
