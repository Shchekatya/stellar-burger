import {changeConstructor} from './reducers'
import * as types from '../actions/actions'

describe('reducers', () => {
it('should handle ADD_CONSTRUCTOR', () => {
    const state= {
        main: [],     
        orders: [],    
      };
      const item={_id: '12', name:'cucumber'};
      const action={
        type: types.ADD_CONSTRUCTOR,
        payload: {item},
        key: 'abc',   
        order: ['12']  
      }
      let newState=changeConstructor(state, action)
    expect(newState).toEqual({
        main: [
            {
                _id: '12', 
                name:'cucumber',  
                key: 'abc', 
            }
        ],   
        orders: ['12'],  
      })
})
it('should handle DELETE_CONSTRUCTOR', () => {
  const state= {
    main: [
      {
          _id: '12', 
          name:'cucumber',  
          key: 'abc', 
      }
  ],   
  orders: ['12'],   
    };
    const item={_id: '12', name:'cucumber'};
    const action={
      type: types.DELETE_CONSTRUCTOR,
      payload: [],    
      order: []  
    }
    let newState=changeConstructor(state, action)
  expect(newState).toEqual({
      main: [],   
      orders: [],  
    })
})
it('should handle ADD_BUN', () => {
  const state= {
      bun: null,     
      orders: [],    
    };
    const item={_id: '12', name:'cucumber'};
    const action={
      type: types.ADD_BUN,
      payload: {item},       
      order: ['12']  
    }
    let newState=changeConstructor(state, action)
  expect(newState).toEqual({
      bun: 
          {
              _id: '12', 
              name:'cucumber',            
          },   
      orders: ['12'],  
    })
})
})