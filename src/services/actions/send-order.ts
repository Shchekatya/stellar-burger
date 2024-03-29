import { BASE_URL } from "../../utils/api";
import { checkResponse } from "../../utils/check-response";
import { getCookie } from "../../utils/cookie";
import { refreshToken } from "./refresh-token";
import { SEND_ORDER, SEND_ORDER_SUCCESS, SEND_ORDER_FAILED } from "./actions";
import { Dispatch } from "redux";
import { AppDispatch, AppThunk } from "../..";
import { useAppDispatch } from "../hooks/hooks";
import {TItem} from '../../components/ingredients/ingredient-single'


export function sendOrder(orders: Array<string>) {

  let cookie = getCookie("authToken");
  const data = { ingredients: orders };
  console.log(data);
  return function (dispatch:AppDispatch) {
    dispatch({
      type: SEND_ORDER,
    });
    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((data) =>
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: data,
        })
      )
      .catch((err) => {
        console.log('что-то пошло не так')
        if (err.message === "jwt expired") {
          
          dispatch(refreshToken());
        }
        dispatch({
          type: SEND_ORDER_FAILED,
        });
      });
  };
}
