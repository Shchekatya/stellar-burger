import { AppDispatch, AppThunk } from "../..";
import { BASE_URL } from "../../utils/api";
import { checkResponse } from "../../utils/check-response";
import { getCookie } from "../../utils/cookie";
import { useAppDispatch } from "../hooks/hooks";
import { SENDING, GET_USER, SENDING_FAILED } from "./profile-actions";
import { refreshToken } from "./refresh-token";
import { Dispatch } from "redux";

export function getUser() {
  let cookie = getCookie("authToken");
  console.log(cookie )
  return function (dispatch:AppDispatch) {
    dispatch({
      type: SENDING,
    });
    fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
    })
      .then(checkResponse)
      .then((res) => {
        console.log(res)
        dispatch({
          type: GET_USER,
          payload: res.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(refreshToken());
        }
        dispatch({
          type: SENDING_FAILED,
        });
      });
  };
}
