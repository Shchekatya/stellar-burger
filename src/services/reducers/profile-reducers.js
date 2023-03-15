import { LOGIN, REGISTER,GET_USER,UPDATE_USER,LOGOUT_USER} from "../actions/profile-actions";

const initialUser= {
    email: null,
    password: null,
    name: null,
    isLoggedIn: false
}


export const login = (state = initialUser, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          email: action.payload.email,
          password: action.payload.password,
          isLoggedIn: true
        }
        case GET_USER:
        return {
          ...state,
          email: action.payload.email,   
          name: action.payload.name,   
          isLoggedIn: true        
        }
        case UPDATE_USER:
          return {
            ...state,
            email: action.payload.email,   
            name: action.payload.name,   
            password: action.payload.password,       
          }
          case REGISTER:
        return {
          email: action.payload.email,   
          name: action.payload.name,   
          password: action.payload.password,  
          isLoggedIn: true
      }
        default:
          return state
    }
  }

  export const register = (state = initialUser, action) => {
    switch (action.type) {
      case REGISTER:
        return {
          email: action.payload.email,   
          name: action.payload.name,   
          password: action.payload.password,  
          isLoggedIn: true
      }
        default:
          return state
    }
  }


  export const logOut = (state = initialUser, action) => {
    switch (action.type) {
      case LOGOUT_USER:
        return {
          email: null,
          password: null,
          name: null,
          isLoggedIn: false
      }
        default:
          return state
    }
  }
  
  
