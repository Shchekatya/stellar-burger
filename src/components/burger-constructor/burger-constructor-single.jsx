import bConst from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import {
    ConstructorElement,
  } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";

export const BurgerConstructorSinge=({order, index, moveCard})=> {
    const [, drag] = useDrag({
        type: 'main',
        item: { order },    
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
      });
  
      const ref = useRef(null);

      const [{ handlerId }, drop] = useDrop({
        // Указываем тип получаемых элементов, чтобы dnd понимал,
        // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
        // Элементы и контейнеры с разными типами не будут взаимодействовать
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
        // индекс которого у нас задан в пропсах props.index
        hover(order, monitor) {
            if (!ref.current) {
                return;
            }
            // Переопределяем индексы ингредиентов для удобства
            const dragIndex = order.index;
            const hoverIndex = index;
            // Ничего не делаем, если ингредиент находится 
            if (dragIndex === hoverIndex) {
                return;
            }
            // Определяем границы карточки ингредиента
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Определяем середину карточки по оси Y нашего ингредиента
            // В момент пересечения этой границы, перетаскиваемым ингредиентом
            // Мы будем менять их местами
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Получаем текущую позицию курсора,
            // относительно текущего контейнера
            const clientOffset = monitor.getClientOffset();
            // Вычисляем координаты курсора и координаты середины карточки
            // на которую мы навели наш перетаскиваемый ингредиент
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Условие для перетаскивании элементов сверху вниз
            // Если перетаскиваемый ингредиент пересекает середину
            // текущего ингредиента, то мы идем дальше и выполняем moveCard
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Условие для перетаскивании элементов снизу вверх
            // Происходит тоже самое что и выше, только в обратном порядке
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Выполняем наш коллбэк с перемещением карточек внутри массива
            moveCard(dragIndex, hoverIndex);
            // Это сделано для внутренней оптимизации библиотеки
            // для поиска и замены элементом
            order.index = hoverIndex;
        }
    })
 //  const opacity = isDragging ? 0 : 1;
    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
   drag(drop(ref));
    // Прерываем базовую функция для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const preventDefault = (e) => e.preventDefault();
    return (
        <div className={bConst.main} ref={drag} onDrop={preventDefault} data-handler-id={handlerId}>                
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