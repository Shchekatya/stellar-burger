import {
  combineReducers
} from "redux"
import {
  loadIngredients,
  changeConstructor,
  showItem
} from "./reducers"
import {
  login,
} from "./profile-reducers"

const rootReducer = combineReducers({
  loadIngredients,
  changeConstructor,
  showItem,
  login,
})

export default rootReducer