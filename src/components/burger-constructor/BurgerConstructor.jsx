import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import bConst from '../burger-constructor/burger-constructor.module.css';

export const BurgerConstructor=(props) => {
    console.log(props.orders);
    return (
        <div className={bConst.right}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={bConst.list}>
   {props.orders.map(order => (
        <ConstructorElement 
        key={order.id}
        type={order.type}
        isLocked={true}
        text={order.name}
        price={order.price}
        thumbnail={order.image}
      />
    ))}
    </div>
    <div className={bConst.bottom}>
        <p className="text text_type_digits-medium">
    {props.orders.reduce((acc, cur) => acc + cur.price, 0)}
    </p> 
    <CurrencyIcon type="primary" />
    <Button htmlType="button" type="primary" size="medium">
  Оформить заказ
</Button>
    </div>
    </div>
    )   
}