import {changeConstructor,loadIngredients} from './reducers'
import * as types from '../actions/actions'
import {initialConstructor, initialIngredients} from './reducers'

describe('reducers', () => {
it('should handle ADD_CONSTRUCTOR', () => {    
      const item={_id: '12', name:'cucumber'};
      const action={
        type: types.ADD_CONSTRUCTOR,
        payload: {item},
        key: 'abc',   
        order: ['12']  
      }
      let newState=changeConstructor(initialConstructor, action)
    expect(newState).toEqual({
      ...initialConstructor,
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
    const item={_id: '12', name:'cucumber'};
    const action={
      type: types.ADD_BUN,
      payload: {item},       
      order: ['12']  
    }
    let newState=changeConstructor(initialConstructor, action)
  expect(newState).toEqual({
    ...initialConstructor,
      bun: 
          {
              _id: '12', 
              name:'cucumber',            
          },   
      orders: ['12'],  
    })
})
it('should handle GET_FEED_SUCCESS', () => {
  const action={
    type: types.GET_FEED_SUCCESS,
    items: [{_id: '12', name:'cucumber'},{_id: '13', name:'watermelon'}],      
  }
  let newState=loadIngredients(initialIngredients, action);
expect(newState).toEqual({
  ...initialIngredients,
  items: [{_id: '12', name:'cucumber'},{_id: '13', name:'watermelon'}],        
  })  
})
})