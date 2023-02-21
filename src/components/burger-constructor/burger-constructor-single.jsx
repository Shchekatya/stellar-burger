import bConst from "../burger-constructor/burger-constructor.module.css";
import { useDrag } from "react-dnd";
import {
    ConstructorElement,
  } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerConstructorSinge=({order})=> {
    const [, dragRef] = useDrag({
        type: 'main',
        item: { order },    
      });
   
    return (
        <div className={bConst.main} ref={dragRef} >                
          <ConstructorElement
          key={order._id}
            type={order.type}
            isLocked={false}
            text={order.name}
            price={order.price}
            thumbnail={order.image}
          />
        </div>
    )
}