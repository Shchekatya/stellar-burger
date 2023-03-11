import { LOGIN, REGISTER,GET_USER,UPDATE_USER,LOGOUT_USER} from "../actions/profile-actions";

const initialUser= {
    email: null,
    password: null,
    name: null,
}
const initialLogin= {
    email: null,
    password: null, 
}
const userGet= {
    email: "email",  
    name: "name",
}

export const login = (state = initialLogin, action) => {
    switch (action.type) {
      case LOGIN:
        return (      
         action.payload
        )
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

  export const getUser = (state = userGet, action) => {
    switch (action.type) {
      case GET_USER:
        return (      
         action.payload
        )
        default:
          return state
    }
  }

  
  export const updateUser = (state = initialUser, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return (                 
         action.payload
        )
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
      }
        default:
          return state
    }
  }
  
  
