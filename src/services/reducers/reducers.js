
import {
  LOAD_SUCCESS,
  ADD_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
  HIDE_ITEM,
  SHOW_ITEM,
  ADD_BUN
} from "../actions/actions"

const initialIngredients = {
  items: [],
}


const initialConstructor = {
  main: [],
  bun: null
}

const initialItem = {
  item: null,
}


export const loadIngredients = (state = initialIngredients, action) => {
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


export const changeConstructor = (state = initialConstructor, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR:
      return {
        ...state,
        main: [...state.main, action.payload.item]
      }

      case DELETE_CONSTRUCTOR:
      return {
        ...state,
        main: action.payload
      }
      

      case UPDATE_CONSTRUCTOR: 
        return {
          ...state,
          main: action.payload
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



export const showItem = (state = initialItem, action) => {
  switch (action.type) { 
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



