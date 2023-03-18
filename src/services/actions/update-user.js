import {useSelector} from "react-redux";
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import { getCookie } from "../../utils/cookie";
import {
    SENDING,
    UPDATE_USER,
    SENDING_FAILED
} from "./profile-actions";


export function useUpdateUser() {
    const user = useSelector((state) => state.login);
    let cookie = getCookie("authToken");  
    const data = {
        email: user.email,
        password: user.password,
        name: user.name,
    }
    return function (dispatch) {
        dispatch({
            type: SENDING
        })
        fetch(`${BASE_URL}/auth/user`, {
            method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookie,
        },
            body: JSON.stringify(data),
          }).then(checkResponse)
          .then(res=> {
                dispatch({
                    type: UPDATE_USER,
                    payload: res.user,
                });
          }).catch(err => {
                dispatch({
                    type: SENDING_FAILED
                })
            })
    }
}