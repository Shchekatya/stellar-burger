import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import { checkResponse } from "../../utils/check-response";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "./refresh-token";
import {
    SEND_ORDER,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED
} from "./actions";


export function sendOrder(orders) {

    let cookie = getCookie("authToken");
    const data = { ingredients: orders }
    return function (dispatch) {      
        dispatch({
            type: SEND_ORDER
        })
        fetch(`${BASE_URL}/orders`,
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + cookie,
            },
            body: JSON.stringify(data),
          })
        .then(checkResponse)
        .then(data => 
            dispatch({
                type: SEND_ORDER_SUCCESS,
                payload: data
            }))
        .catch(err => {
            if (err.message === "jwt expired") {
                dispatch(refreshToken());
              }
            dispatch({
                type: SEND_ORDER_FAILED
            })
        })
    }
}