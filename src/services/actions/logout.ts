
import { useNavigate} from "react-router-dom";
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import {
    getCookie,
    setCookie
} from "../../utils/cookie";
import {
    SENDING,
    LOGOUT_USER,
    SENDING_FAILED
} from "./profile-actions";
import { Dispatch } from "redux";
import { useAppDispatch } from "../hooks/hooks";


export function logOut() {
const dispatch=useAppDispatch();
    const data = {
        token: getCookie("refreshToken"),
    }
    return function () {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(checkResponse)
            .then(res => {
                if (res.message) {
                    setCookie("authToken", '', {
                        expires: -1
                    });
                    setCookie("refreshToken", '', {
                        expires: -1
                    });
                    dispatch({
                        type: LOGOUT_USER,
                        payload: '',
                    });        
                }

            }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}