import { LOGIN, REGISTER,GET_USER,UPDATE_USER,LOGOUT_USER} from "../actions/profile-actions";

const initialUser= {
    email: null,
    password: null,
    name: null,
    isLoggedIn: false
}
const initialLogin= {
    email: null,
    password: null, 
}
const userGet= {
    email: "email",  
    name: "name",
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
        }
        case UPDATE_USER:
          return {
            ...state,
            email: action.payload.email,   
            name: action.payload.name,   
            password: action.payload.password,       
          }
        default:
          return state
    }
  }

  export const register = (state = initialUser, action) => {
    switch (action.type) {
      case REGISTER:
        return (      
         action.payload
        )
        default:
          return state
    }
  }

  // export const getUser = (state = initialUser, action) => {
  //   switch (action.type) {
  //     case GET_USER:
  //       return {
  //         ...state,
  //         email: action.payload.email,   
  //         name: action.payload.name,        
  //       }
  //       default:
  //         return state
  //   }
  // }

  
  // export const updateUser = (state = initialUser, action) => {
  //   switch (action.type) {
  //     case UPDATE_USER:
  //       return (                 
  //        action.payload
  //       )
  //       default:
  //         return state
  //   }
  // }

  export const logOut = (state = initialUser, action) => {
    switch (action.type) {
      case LOGOUT_USER:
        return {
          email: null,
          password: null,
          name: null,
      }
        default:
          return state
    }
  }
  
  
