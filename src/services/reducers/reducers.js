import { combineReducers } from "redux"
import { LOAD_SUCCESS,ADD_CONSTRUCTOR, UPDATE_CONSTRUCTOR, DELETE_CONSTRUCTOR,HIDE_ITEM, DELETE_ORDER, ADD_ORDER, SHOW_ITEM, ADD_BUN } from "../actions/actions"

const initialIngredients = 
    {
        items: [],
    }


const initialConstructor = {
  main:[],
  bun:null
}

const initialItem = 
    {
        item: null,
    }


const initialOrder = []

// Редьюсер
const loadIngredients = (state = initialIngredients, action) => {
  switch (action.type) {        
    case LOAD_SUCCESS:     
      return {
        ...state,
        items: action.payload
    }   
    default:
      return state
  }
} 


const changeConstructor = (state = initialConstructor, action) => {
    switch (action.type) {       
      case ADD_CONSTRUCTOR:      
        return {
          ...state,       
          main: [...state.main, action.payload.item]
        }
          
      case UPDATE_CONSTRUCTOR:
        return {
          ...state, 
          main: [action.payload]
        }

        case ADD_BUN:
          return {
            ...state, 
            bun: action.payload.item
          }
      default:
        return state
    }
  } 



const showItem = (state = initialItem, action) => {
    switch (action.type) {
          // Добавление новой задачи в список дел
      case SHOW_ITEM:
        return {
            ...state,
            item: action.payload
        }
        case HIDE_ITEM:
        return {
            ...state,
            item: null
        }
      default:
        return state 
    }
  } 

  const changeOrder = (state = initialOrder, action) => {
    
    switch (action.type) {         
      case ADD_ORDER:        
          return [
            ...state, 
            action.payload.item          
          ]
       
     
      
      case DELETE_ORDER:
        return {
          ...state,
          main: state.tasks.filter(item => item.id !== action.payload)
      } 
      default:
        return state
    }
  } 

  const rootReducer = combineReducers({
    loadIngredients,
    changeConstructor,
    showItem,
    changeOrder,  
}) 

export default rootReducer