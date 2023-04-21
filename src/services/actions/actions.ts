import {TItem} from '../../components/ingredients/ingredient-single';

export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const ADD_CONSTRUCTOR = 'ADD_CONSTRUCTOR';
export const DELETE_CONSTRUCTOR = 'DELETE_CONSTRUCTOR';
export const ADD_BUN = 'ADD_BUN';
export const UPDATE_CONSTRUCTOR = 'UPDATE_CONSTRUCTOR';
export const ADD_ORDER = 'ADD_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const SHOW_ITEM = 'SHOW_ITEM';
export const HIDE_ITEM = 'HIDE_ITEM';
export const ADD_OREDER_BUN = 'HIDE_ITEM';
export const GET_FEED = 'GET_FEED';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';



  export type TActionConstructor = {
    type: typeof ADD_CONSTRUCTOR 
    | typeof DELETE_CONSTRUCTOR 
    | typeof UPDATE_CONSTRUCTOR 
    | typeof ADD_BUN 
    | typeof SEND_ORDER
    | typeof SEND_ORDER_SUCCESS
    | typeof SEND_ORDER_FAILED
    payload?:any
    key?: string    
    order?: Array<string>,
  }

  export type TActionGetFeed = {
    type: typeof GET_FEED | typeof GET_FEED_SUCCESS | typeof GET_FEED_FAILED
    items?: Array<TItem>  
  }

  
  // export interface IAddConsructor {
  //   readonly type: typeof ADD_CONSTRUCTOR;
  //   order: Array<string>;
  //   key: string 
  //   payload: any
 
  // }

  // export interface IDeleteConstructor {
  //   readonly type: typeof DELETE_CONSTRUCTOR;
  //   payload:Array<TItem>
  // }

  // export interface IUpdate {
  //   readonly type: typeof UPDATE_CONSTRUCTOR;
  //   payload:TItem
  // }

  // export interface IAddBun {
  //   readonly type: typeof ADD_BUN; 
  //   order: Array<string>;
  //   payload: any     
  // }

  // export interface ISendOrder {
  //   readonly type: typeof SEND_ORDER;
  // }
  
  // export interface ISendOrderSuccess {
  //   readonly type: typeof SEND_ORDER_SUCCESS;
  //   payload:any
  // }

  // export interface ISendOrderFailed {
  //   readonly type: typeof SEND_ORDER_FAILED;
  // }

  // export type TActionConstructor = 
  //   | IAddConsructor
  //   | IDeleteConstructor
  //   | IUpdate
  //   | IAddBun
  //   | ISendOrder 
  //   | ISendOrderSuccess
  //   | ISendOrderFailed

  export type TActionShow = {
    type: typeof HIDE_ITEM
    payload?:object |null
  }





