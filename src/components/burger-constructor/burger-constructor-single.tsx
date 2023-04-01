import bConst from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import PropTypes from "prop-types";


type TProps={
  order: TOrder
  index: number
  moveCard:any
  delCard:any
}

type TOrder= {
  key: string   
  _id: string
  price: number
  image: string
  name: string
  type?: "top" | "bottom" | undefined
  id: string
  index: any
}

export const BurgerConstructorSinge = ({ order, index, moveCard, delCard }:TProps) => {   
  const onClick = () => delCard(index);
  const ref = useRef<HTMLInputElement>(null);

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

      const dragIndex =order?.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      let hoverClientY
      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      } else {
        hoverClientY = hoverBoundingRect.top;
      }
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

    order?.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "main",
    item: () => ({ id: order.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  const preventDefault: (e:any)=>void = (e: React.ChangeEvent<HTMLInputElement>) => e.preventDefault();
  return (
    <div
      className={bConst.main}
      ref={ref}
      onDrop={preventDefault}
      data-handler-id={handlerId}
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
  delCard: PropTypes.func.isRequired,
};
