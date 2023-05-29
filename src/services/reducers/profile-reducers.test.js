import {login} from './profile-reducers'
import * as types from '../actions/profile-actions'
import {initialUser} from './profile-reducers'

describe('reducers', () => {
    it('should handle EMAIL_TO_FORGOT', () => {             
          const action={
            type: types.EMAIL_TO_FORGOT,
            payload: 'shchekatya',          
          }
          let newState=login(initialUser, action)
        expect(newState).toEqual({
          ...initialUser,
          email:  'shchekatya',                
          })
    })
    it('should handle FORGOT', () => {             
        const action={
          type: types.FORGOT,
          payload: 'shchekatya',          
        }
        let newState=login(initialUser, action)
      expect(newState).toEqual({
        ...initialUser,
        name:  'shchekatya',                
        })
  })
  it('should handle LOGIN', () => {             
    const action={
      type: types.LOGIN,
      email: 'shchekatya',  
      password: 'password',       
    }
    let newState=login(initialUser, action)
  expect(newState).toEqual({
    ...initialUser,
    email: 'shchekatya',
    password: 'password',   
    isLoggedIn: true,            
    })
})
it('should handle GET_USER', () => {             
    const action={
      type: types.GET_USER,
      payload:  {email: 'shchekatya', name: 'Генрих II'}  
    }
    let newState=login(initialUser, action)
  expect(newState).toEqual({
    ...initialUser,
    email: 'shchekatya',
    name: 'Генрих II',             
    })
})
it('should handle UPDATE_USER', () => {             
    const action={
      type: types.UPDATE_USER,
      payload:  {email: 'shchekatya', name: 'Генрих II', password: 'password'}  
    }
    let newState=login(initialUser, action)
  expect(newState).toEqual({
    ...initialUser,
    email: 'shchekatya',
    name: 'Генрих II',              
    })
})
it('should handle LOGOUT_USER', () => {             
    const action={
      type: types.LOGOUT_USER,   
    }
    let newState=login(initialUser, action)
  expect(newState).toEqual({
    ...initialUser,
    email: '',
    name: '', 
    isLoggedIn: false,             
    })
})
it('should handle REGISTER', () => {             
    const action={
      type: types.REGISTER,   
      payload:  {email: 'shchekatya', name: 'Генрих II', password: 'password'} 
    }
    let newState=login(initialUser, action)
  expect(newState).toEqual({
    ...initialUser,
    email: 'shchekatya',
    name: 'Генрих II', 
    password: 'password',
    isLoggedIn: true,
    sendRequest: false,   
    sendFailed: false,        
    })
})
})