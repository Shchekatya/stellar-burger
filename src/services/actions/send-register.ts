import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import { Dispatch } from "redux";
import {
    SENDING,
    REGISTER,
    SENDING_FAILED
} from "./profile-actions";
import { useAppDispatch } from "../hooks/hooks";

export function sendRegister(value:string, pass:string, name:string) {
    const dispatch=useAppDispatch();
    const data = {
        name: name,
        email: value,
        password: pass
    }
    return function () {
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