import { useSelector } from "../../services/hooks/hooks";
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
import { Dispatch } from "redux";


export const forgot = (email:string):any => {
    const data = {
        email: email,
    }
    return function (dispatch:Dispatch) {
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