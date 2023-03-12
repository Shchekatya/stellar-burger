import styles from "./app.module.css";
import { AppHeader } from "../app-header/AppHeader";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { Modal } from "../modal/Modal";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Register } from "../pages/register";
import { Reset } from "../pages/reset-password";
import { Login } from "../pages/login";
import { Page404 } from "../pages/404";
import { MainBurgers } from "../pages/main-burgers";
import { Profile } from "../pages/profile";
import { Forgot } from "../pages/forgot-password";
import { ProtectedRouteElement } from "../../utils/protected-route";
import { useDispatch } from "react-redux";
import { HIDE_ITEM, LOAD_SUCCESS } from "../../services/actions/actions";
import { useEffect } from "react";
import { api } from "../../utils/api";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let background = location.state && location.state.background;

  const loadItems = (items) => {
    dispatch({
      type: LOAD_SUCCESS,
      payload: items,
    });
  };

  useEffect(() => {
    const getProductData = async () => {
        try {
          const res = await fetch(api);
          // debugger
          const data = await res.json();
          if (res.ok) {
            loadItems(data.data)
          } else {
            console.log("Ошибка HTTP: " + res.status);
          }
        } catch (error) {
          console.log("АШИПКА!!", error);
        }
      };
    getProductData();
  }, []);
 
  const handleModalClose = () => {
    dispatch({
     type: HIDE_ITEM,
    });
    navigate(-1);
  };

  return (
    <div className={styles.app}>
        <header>
          <AppHeader />
        </header>
        <main>
          <Routes location={background || location}>
            <Route path='/' element={<MainBurgers />} />           
            <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />           
            <Route path="/reset-password" element={<Reset />} />
            <Route element={<ProtectedRouteElement />}>
              <Route path="/profile" element={<Profile />} />
            </Route>           
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
    
          {background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </main>
    </div>
  );
};

export default App;
