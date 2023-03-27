import {
    useSelector
} from "react-redux";
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    BASE_URL
} from "../../utils/api";
import {
    checkResponse
} from "../../utils/check-response";
import {
    SENDING,
    SENDING_FAILED,
    FORGOT
} from "./profile-actions";


export const forgot = (email) => {
    const data = {
        email: email,
    }
    return function (dispatch) {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/password-reset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(checkResponse)
            .then(res => {
                dispatch({
                    type: FORGOT,
                    payload: res.message,
                })
            })
            .catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}