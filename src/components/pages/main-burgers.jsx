import { BurgerConstructor } from "../burger-constructor/BurgerConstructor";
import { BurgerIngredients } from "../burger-ingredients/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function MainBurgers() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
}
