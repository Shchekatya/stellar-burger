import { combineReducers } from "redux"
import { LOAD,LOAD_SUCCESS,LOAD_FAILED, ADD_CONSTRUCTOR, DELETE_CONSTRUCTOR, DELETE_ORDER, ADD_ORDER, SHOW_ITEM } from "../actions/actions"

const initialIngredients = [
    {
        items: [],
  loading: true,
    }
]

const initialConstructor = [
    {
        bun: null,
        main: [],
    }
]

const initialItem = [
    {
        item: null,
    }
]

const initialOrder = [
    {
        order: [],
    }
]

// Редьюсер
const loadIngredients = (state = initialIngredients, action) => {
  switch (action.type) {
        // Добавление новой задачи в список дел
    case LOAD:
      return [
       
      ]
    
    case LOAD_SUCCESS:
      return 
    case LOAD_FAILED:
      return 
    default:
      return state
  }
} 


const changeConstructor = (state = initialConstructor, action) => {
    switch (action.type) {
          // Добавление новой задачи в список дел
      case ADD_CONSTRUCTOR:
        return [
        ]
       
      case DELETE_CONSTRUCTOR:
        return 
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
      default:
        return state
    }
  } 

  const changeOrder = (state = initialOrder, action) => {
    switch (action.type) {
          // Добавление новой задачи в список дел
      case ADD_ORDER:
        return [
        ]
          // Изменение статуса задачи в списке дел
      case DELETE_ORDER:
        return 
          // Реакция на прочие типы экшенов
      default:
        return state
    }
  } 

  const rootReducer = combineReducers({
    loadIngredients,
    changeConstructor,
    showItem,
    changeOrder
}) 

export default rootReducer