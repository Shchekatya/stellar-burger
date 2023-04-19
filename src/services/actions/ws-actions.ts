export const WS_CONNECTION_PROFILE: 'WS_CONNECTION_PROFILE' = 'WS_CONNECTION_PROFILE';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';



export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
  }

  export interface IWSConnectionProfile {
    readonly type: typeof WS_CONNECTION_PROFILE;
    readonly payload: string;
  }
  
  export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: Event;
  }
  
  export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
  }
  
  export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;   
    readonly payload?: any;
  }
  
  export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
  }
  
  export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: {message: string};
  }
  
  export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionProfile
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction;

    
export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START,
  wsInitProfile: typeof WS_CONNECTION_PROFILE,
  wsSendMessage: typeof WS_SEND_MESSAGE,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onWSClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE, 
  };
