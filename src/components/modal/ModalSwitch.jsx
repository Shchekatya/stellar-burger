import { useDispatch } from "react-redux";
import { HIDE_ITEM } from "../../services/actions/actions";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Router } from "react-router-dom";
import { MainBurgers } from "../pages/main-burgers";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { Page404 } from "../pages/404";
import { Modal } from "./Modal";

export const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    let background = location.state && location.state.background;
   
    const handleModalClose = () => {
      dispatch({
       type: HIDE_ITEM,
      });
      navigate(-1);
    };
   
    return (
       <>       
         <Routes location={background || location}>
           <Route path='/' element={<MainBurgers />} />           
           <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
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
       </>
      );
     };