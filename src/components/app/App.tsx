import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal-ingredient/modal";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Register } from "../../pages/register";
import { Reset } from "../../pages/reset-password";
import { Login } from "../../pages/login";
import { Page404 } from "../../pages/404";
import { MainBurgers } from "../../pages/main-burgers";
import { Profile } from "../../pages/profile-menu";
import { Forgot } from "../../pages/forgot-password";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { HIDE_ITEM, TActionShow } from "../../services/actions/actions";
import { useEffect } from "react";
import { getFeed } from "../../services/actions/get-feed";
import { ProtectedReset } from "../protected-route/protected-reset";
import { useAppDispatch, useSelector } from "../../services/hooks/hooks";
import { Feed } from "../../pages/feed";
import { FeedId } from "../feed/feed-id";
import { Order } from "../../pages/orders";
import { ProfileInfo } from "../../pages/profile";
import { Dispatch } from 'redux';




const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  const {feedRequest, feedFailed } = useSelector(
    (state) => state.loadIngredients
  );
  useEffect(() => {
    dispatch(getFeed());    
  }, []);

  const handleModalClose = () =>  {   
    navigate(-1);
  };
  if (feedFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (feedRequest) {
    return <p>Загрузка...</p>;
  }
  return (
    <div className={styles.app}>
      <header>
        <AppHeader />
      </header>
      <main>
        <Routes 
        location={background || location}
        >
          <Route path="/" element={<MainBurgers />} />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          
          <Route
            path="/feed/:orderId"
            element={<FeedId />}
          />     
          <Route
            path="/profile/orders/:orderId"
            element={<FeedId />}
          />       
          <Route
            path="/reset-password"
            element={
              <ProtectedReset>
                <Reset />
              </ProtectedReset>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <Profile />
              </ProtectedRouteElement>
            }
          >
<Route path="/profile/orders" element={<Order />} />
<Route path="/profile" element={<ProfileInfo />} />
          </Route>

          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
             {/* <Route
              path="/feed/:orderId"
              element={
                <Modal onClose={handleModalClose}>
                  <FeedId />
                </Modal>
              }
            /> */}
            <Route
              path="/profile/orders/:orderId"
              element={
                <Modal onClose={handleModalClose}>
                  <FeedId />
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
