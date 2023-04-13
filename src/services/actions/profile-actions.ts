export const SENDING = 'SENDING';
export const SENDING_FAILED = 'SENDING_FAILED';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER = 'UPDATE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOT = 'FORGOT';
export const EMAIL_TO_FORGOT = 'EMAIL_TO_FORGOT';


export interface ISendingUser {
    readonly type: typeof SENDING;
}

export interface ISendingFailedUser {
    readonly type: typeof SENDING_FAILED;
}

export interface ILoginUser {
    readonly type: typeof LOGIN;
    email: string,
    password: string,
}

export interface IRegisterUser {
    readonly type: typeof REGISTER;
    payload?: any,
}

export interface IUpdateUser {
    readonly type: typeof UPDATE_USER;
    payload?: any,
}

export interface IGetUser {
    readonly type: typeof GET_USER;
    payload?: any,
}

export interface ILogouttUser {
    readonly type: typeof LOGOUT_USER;
}

export interface IForgotUser {
    readonly type: typeof FORGOT;
    payload?: any,
}

export interface IEmailToForgotUser {
    readonly type: typeof EMAIL_TO_FORGOT;
    payload?: any,
}

export type TUserActions =
  | ISendingUser
  | ISendingFailedUser
  | ILoginUser
  | IRegisterUser
  | IUpdateUser
  | IGetUser
  | ILogouttUser
  | IForgotUser
  | IEmailToForgotUser