
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


export function useLogOut() {
    const navigate = useNavigate(); 
    const data = {
        token: getCookie("refreshToken"),
    }
    return function (dispatch) {
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
                    setCookie("authToken", null, {
                        expires: -1
                    });
                    setCookie("refreshToken", null, {
                        expires: -1
                    });
                    dispatch({
                        type: LOGOUT_USER,
                        payload: '',
                    });
                    navigate('/login')
                }

            }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}