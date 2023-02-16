import React from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/AppHeader";
import { BurgerIngredients } from "../burger-ingredients/BurgerIngredients";
import api from "../../utils/api";
import { BurgerConstructor } from "../burger-constructor/BurgerConstructor";
import { IngredientContext } from "../../utils/ingredient-context";


const App = () => {
  const [orders, setOrders] = React.useState({
    bun: null,
    main: [],
  });
 

const [state, setState] = React.useState({
   items: [],
  loading: true,
 }); 




  const addToOrder = (item) => {
    if (item.type==="bun") {
      setOrders({...orders, bun:item});
    } else {
      setOrders({
        ...orders,
        main: [...orders.main, item],
      });
    }    
  };

  React.useEffect(() => {
    const getProductData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(api);
        const data = await res.json();
       // return res.ok ? res.json() : res.json().then((err) => Promise.reject(err)).
        setState({ items: data.data, loading: false });
      } catch (error) {
        console.log("АШИПКА!!", error);        
      }
    };

    getProductData();
  }, []);



  return (
    <div className={styles.app}>
      <header>
        <AppHeader />
      </header>
      <main>
        <IngredientContext.Provider value={{state}}>
        <BurgerIngredients onAdd={addToOrder} />
        <BurgerConstructor orders={orders} />
        </IngredientContext.Provider>
      </main>
    </div>
  );
};

export default App;
