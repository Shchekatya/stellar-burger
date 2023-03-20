import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import {
    SENDING,
    REGISTER,
    SENDING_FAILED
} from "./profile-actions";


export function sendRegister(user) {
    const data = {
        name:user.name,
        email: user.email,
        password: user.password
    }
    return function (dispatch) {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(checkResponse)
          .then(res=> {    
                dispatch({
                  type: REGISTER,
                  payload: user,
                });
          }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}