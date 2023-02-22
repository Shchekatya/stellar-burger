import bConst from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { DELETE_CONSTRUCTOR } from "../../services/actions/actions";

export const BurgerConstructorSinge = ({ order, index, moveCard }) => {

  const dispatch = useDispatch(); 
  const handleClose = (order) => {  

    dispatch({
      type: DELETE_CONSTRUCTOR,
      payload: order,
    });
  };

  const onClick = () => handleClose(order);
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({ 
    accept: "main",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
        hover(order, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = order.index;
      const hoverIndex = index;  
      if (dragIndex === hoverIndex) {
        return;
      }
     
      const hoverBoundingRect = ref.current?.getBoundingClientRect();      
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;     
      const clientOffset = monitor.getClientOffset();      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
   
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
     
      moveCard(dragIndex, hoverIndex);
      
      order.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "main",
    item: () => ({ id: order.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
   const opacity = isDragging ? 0 : 1;
  
  drag(drop(ref));
  
  const preventDefault = (e) => e.preventDefault();
  return (
    <div
      className={bConst.main}
      ref={ref}
      onDrop={preventDefault}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <ConstructorElement
        key={order._id}
        type={order.type}
        isLocked={false}
        text={order.name}
        price={order.price}
        thumbnail={order.image}
        handleClose={onClick}
      />
    </div>
  );
};


BurgerConstructorSinge.propTypes = {
  order: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
}; 
