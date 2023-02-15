import React from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/AppHeader";
import { BurgerIngredients } from "../burger-ingredients/BurgerIngredients";
import api from "../../utils/api";
import { BurgerConstructor } from "../burger-constructor/BurgerConstructor";

const App = () => {
  const [orders, setOrders] = React.useState([]);

  const [state, setState] = React.useState({
    items: [],
    loading: true,
  }); 

  const addToOrder = (item) => {
    setOrders([...orders, item]);
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
        <BurgerIngredients items={state.items} onAdd={addToOrder} />
        <BurgerConstructor orders={orders} items={state.items}/>
      </main>
    </div>
  );
};

export default App;
