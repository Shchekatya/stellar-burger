import {api} from "../../utils/api";
import React from "react";
import { BurgerConstructor } from "../burger-constructor/BurgerConstructor";
import { BurgerIngredients } from "../burger-ingredients/BurgerIngredients";
import { useDispatch } from "react-redux";
import { LOAD_SUCCESS } from "../../services/actions/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function MainBurgers() {
    const dispatch = useDispatch();
    const loadItems = (items) => {
      dispatch({
        type: LOAD_SUCCESS,
        payload: items,
      });
    };
   
   
   
     React.useEffect(() => {
       const getProductData = async () => {       
           try {
             const res = await fetch(api);
             const data = await res.json();
             if (res.ok) {
               loadItems(data.data)           
           } else {
               console.log("Ошибка HTTP: " + res.status);  }        
           } catch (error) {
             console.log("АШИПКА!!", error);        
           }
         };
       getProductData();
     }, []);

return (
    <DndProvider backend={HTML5Backend}>
    <BurgerIngredients />
    <BurgerConstructor  />
    </DndProvider>
)
}