import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import { checkResponse } from "../../utils/check-response";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { SENDING, LOGOUT_USER, SENDING_FAILED } from "./profile-actions";
import { Dispatch } from "redux";


export function logOut() {
const cookie=getCookie("authToken")
  const data = {
    token: getCookie("refreshToken"),
  };
  return function (dispatch:Dispatch) {
    dispatch({
      type: SENDING,
    });
    fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
   
      .then(checkResponse)
      .then((res) => {        
        deleteCookie("authToken");
          deleteCookie("refreshToken");
          dispatch({
            type: LOGOUT_USER,
            payload: "",
          });
        console.log(cookie)
      })
      .catch((err) => {
        dispatch({
          type: SENDING_FAILED,
        });
      });
  };
}
