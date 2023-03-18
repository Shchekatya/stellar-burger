import {
  SENDING,
  LOGIN,
  SENDING_FAILED,
  REGISTER,
  GET_USER,
  UPDATE_USER,
  LOGOUT_USER
} from "../actions/profile-actions";

const initialUser = {
  email: '',
  password: '',
  name: '',
  isLoggedIn: false,
  sendRequest: false,
  sendFailed: false,
}


export const login = (state = initialUser, action) => {
  switch (action.type) {
    case SENDING:
      return {
        ...state,
        sendRequest: true,
        sendFailed: false,
      }
      case SENDING_FAILED: {
        return {
          ...state,
          sendFailed: true,
          sendRequest: false
        };
      }     
      case LOGIN:
        return {
          ...state,
          email: action.payload.email,
            password: action.payload.password,
            isLoggedIn: true,
            sendRequest: false
        }
        case GET_USER:
          return {
            ...state,
            email: action.payload.email,
              name: action.payload.name,           
              sendRequest: false
          }
          case UPDATE_USER:
            return {
              ...state,
              email: action.payload.email,
                name: action.payload.name,
                password: action.payload.password,
                sendRequest: false
            }
            case LOGOUT_USER:
              return {
                ...state,
                email: '',
                  password: '',
                  name: '',
                  isLoggedIn: false,
                  sendRequest: false
              }
            case REGISTER:
              return {
                email: action.payload.email,
                  name: action.payload.name,
                  password: action.payload.password,
                  isLoggedIn: true,
                  sendRequest: false
              }
              default:
                return state
  }
}

