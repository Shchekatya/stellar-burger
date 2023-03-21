import {useSelector} from "react-redux";
import {useLocation, useNavigate } from "react-router-dom";
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import { setCookie } from "../../utils/cookie";
import {
    SENDING,
    LOGIN,
    SENDING_FAILED
} from "./profile-actions";


export function loginUser(user) {
 
    const data = {
        email: user.email,
        password: user.password
    }
    return function (dispatch) {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(checkResponse)
          .then(res=> {
            const authToken = res.accessToken.split("Bearer ")[1];
                const refreshToken = res.refreshToken;
                if (authToken) {
                  setCookie("authToken", authToken);
                  setCookie("refreshToken", refreshToken);                 
                }
                dispatch({
                  type: LOGIN,
                  payload: user,
                });
          }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}