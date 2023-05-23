import {changeConstructor} from './reducers'
import * as types from '../actions/actions'


it('should handle ADD_TODO', () => {
    const state= {
        main: [],     
        orders: [],    
      };
      const action={
        type: types.ADD_CONSTRUCTOR,
        payload: {_id: '12', name:'cucumber'},
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