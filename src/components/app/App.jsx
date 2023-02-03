import React, { Component } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/AppHeader";
import { BurgerIngredients } from "../burger-ingredients/BurgerIngredients";
import items from "../../utils/data";
import { BurgerConstructor } from "../burger-constructor/BurgerConstructor";

class App extends React.Component {
  state = {
    orders: [],
  };

  addToOrder = (item) => {
    this.setState((prevState) => {
      return {
        orders: [...prevState.orders, item],
      };
    });
  };

  render() {
    return (
      <div className={styles.app}>
        <header>
          <AppHeader />
        </header>
        <main>
          <BurgerIngredients items={items} onAdd={this.addToOrder} />
          <BurgerConstructor orders={this.state.orders} />
        </main>
      </div>
    );
  }
}

export default App;
