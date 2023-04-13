import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import { Dispatch } from "redux";
import {
    SENDING,
    REGISTER,
    SENDING_FAILED
} from "./profile-actions";
import { useDispatch } from "../hooks/hooks";

export function sendRegister(value:string, pass:string, name:string):any {
    const data = {
        name: name,
        email: value,
        password: pass
    }
    return function (dispatch:Dispatch) {
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
                  payload: data,
                });
          }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}