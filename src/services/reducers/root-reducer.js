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
  register,

} from "./profile-reducers"

const rootReducer = combineReducers({
  loadIngredients,
  changeConstructor,
  showItem,
  login,
  register,
})

export default rootReducer