import { combineReducers } from "redux"
import { loadIngredients,changeConstructor, showItem} from "./reducers"
import {login, register,getUser} from "./profile-reducers"

const rootReducer = combineReducers({
    loadIngredients,
    changeConstructor,
    showItem,
    login,
    register,
    getUser
  })
  
  export default rootReducer