
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import { Dispatch } from "redux";
import {
    SENDING,
    SENDING_FAILED,
    FORGOT  
} from "./profile-actions";


export const reset=(code:string, pass:string):any =>{      
    const data = {
        password: pass,
        token: code,
      }
    return function (dispatch:Dispatch) {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/password-reset/reset`, {
            method: "POST",
            headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
          }).then(checkResponse)
          .then(res=> {
            dispatch({
              type: FORGOT,
              payload: res.message,
          })
          }).catch(err => {
            console.log(err)
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}