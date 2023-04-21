import { combineReducers } from "redux";
import { loadIngredients, changeConstructor, showItem } from "./reducers";
import { login } from "./profile-reducers";
import { wsReducer } from "./ws-reducers";

const rootReducer = combineReducers({
  loadIngredients,
  changeConstructor,
  showItem,
  login,
  wsReducer,
});

export default rootReducer;
