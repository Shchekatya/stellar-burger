import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import Ing from "../ingredients/ingredients.module.css";

class Ingredients extends React.Component {
  render() {
    return (
      <div className={Ing.show}>
        {this.props.items
          .filter((e) => e.type === this.props.type)
          .map((item) => (
            <div
              key={item._id}
              onClick={() => this.props.onAdd(item)}
              className={Ing.card}
            >
              <img src={item.image} />
              <p className="text text_type_digits-default">
                {item.price}
                <CurrencyIcon type="primary" />
              </p>
              <p className="text text_type_main-small">{item.name}</p>
            </div>
          ))}
      </div>
    );
  }
}

Ingredients.propTypes = {
    type: PropTypes.string,
    items: PropTypes.array
}

export default Ingredients;
