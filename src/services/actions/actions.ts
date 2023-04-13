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


export type TActionGetFeed = {
    type: typeof GET_FEED | typeof GET_FEED_SUCCESS | typeof GET_FEED_FAILED
    items?: Array<object>
  }

  export type TActionConstructor = {
    type: typeof ADD_CONSTRUCTOR 
    | typeof DELETE_CONSTRUCTOR 
    | typeof UPDATE_CONSTRUCTOR 
    | typeof ADD_BUN 
    | typeof SEND_ORDER
    | typeof SEND_ORDER_SUCCESS
    | typeof SEND_ORDER_FAILED
    payload:any
    item: object
    key: string
    order: string
  }

  export type TActionShow = {
    type: typeof HIDE_ITEM
    payload:object |null
  }





