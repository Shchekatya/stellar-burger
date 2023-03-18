import {
    BASE_URL
} from "../../utils/api";
import {
    checkResponse
} from "../../utils/check-response";
import {
    setCookie,
    getCookie
} from "../../utils/cookie";
import {
    SENDING,
    SENDING_FAILED
} from "./profile-actions";


export function useRefreshToken() {
    const data = {
        token: getCookie("refreshToken"),
    }
    return function (dispatch) {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/auth/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(checkResponse)
            .then(res => {
                let authToken = res.accessToken.split("Bearer ")[1];
                let refreshToken = res.refreshToken;
                if (authToken) {
                    setCookie("authToken", authToken);
                    setCookie("refreshToken", refreshToken);
                }
            }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}