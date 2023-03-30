import {
  SENDING,
  LOGIN,
  SENDING_FAILED,
  REGISTER,
  GET_USER,
  UPDATE_USER,
  LOGOUT_USER,
  FORGOT,
  EMAIL_TO_FORGOT
} from "../actions/profile-actions";

type TInitialUser = {
  email: string,
  password: string,
  name: string,
  isLoggedIn: boolean,
  sendRequest: boolean,
  sendFailed?: boolean,
}

const initialUser:TInitialUser = {
  email: '',
  password: '',
  name: '',
  isLoggedIn: false,
  sendRequest: false,
  sendFailed: false,
}


export type TActionUser={
type: string,
payload?: any,
email?: string,
password?: string,
}

export const login = (state = initialUser, action:TActionUser) => {
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
        }
      }
      case EMAIL_TO_FORGOT: {
        console.log(action.payload)
        return {
          ...state,
         email: action.payload,
          sendRequest: false
        };
      } 
        case FORGOT: {
          console.log(action.payload)
          return {
            ...state,
           name: action.payload,
            sendRequest: false
          };
        } 
       
      case LOGIN:
        return {
          ...state,
          email: action.email,
            password: action.password,
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

