
import {
  ADD_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
  HIDE_ITEM,
  SHOW_ITEM,
  ADD_BUN,
  GET_FEED,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
  SEND_ORDER,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED
 
} from "../actions/actions"

const initialIngredients = {
  feedRequest: false,
  feedFailed: false,
  items: [],

}


const initialConstructor = {
  main: [],
  bun: null,
  orders: [],
  orderSend: false,
  orderFailed: false,
  result:''
}

const initialItem = {
  item: null,
}


export const loadIngredients = (state = initialIngredients, action) => {
  switch (action.type) {
    case GET_FEED: {
      return {
        ...state,          
        feedRequest: true,           
        feedFailed: false,
      };
    }

    case GET_FEED_SUCCESS: {
      return { 
                ...state, 
                items: action.items, 
                feedRequest: false 
            };
    }
    case GET_FEED_FAILED: {
      return { 
                ...state,    
                feedFailed: true,    
                feedRequest: false 
            };
    }   
        default: {
            return state
        }
    }

}


export const changeConstructor = (state = initialConstructor, action) => {
  switch (action.type) {    
    case ADD_CONSTRUCTOR:     
      return {
        ...state,             
        main: [...state.main, {...action.payload.item, key: action.key}],
        orders: action.order
      }
     
      case DELETE_CONSTRUCTOR:
      return {
        ...state,
        main: action.payload
      }
      

      case UPDATE_CONSTRUCTOR: 
        return {
          ...state,
          main: action.payload,          
        }

        case ADD_BUN:
          return {
            ...state,
            bun: action.payload.item,   
            orders: action.order
          }
          case SEND_ORDER: {
            return {
              ...state,          
              orderSend: true,           
              orderFailed: false,
            };
          }
      
          case SEND_ORDER_SUCCESS: {
            return { 
                      ...state,     
                      result: action.payload,               
                      orderSend: false 
                  };
          }
          case SEND_ORDER_FAILED: {
            return { 
                      ...state,    
                      orderFailed: true,    
                      orderSend: false 
                  };
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



