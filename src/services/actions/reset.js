import {useSelector} from "react-redux";
import {useNavigate } from "react-router-dom";
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import {
    SENDING,
    SENDING_FAILED,
    FORGOT  
} from "./profile-actions";


export const reset=(user) =>{      
    const data = {
        password: user.password,
        token: user.name,
      }
    return function (dispatch) {
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