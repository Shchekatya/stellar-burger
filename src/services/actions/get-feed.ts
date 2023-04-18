import { BASE_URL } from "../../utils/api";
import { checkResponse } from "../../utils/check-response";
import {
    GET_FEED,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS
} from "./actions";
import { Dispatch } from "redux";


export function getFeed() {

    return function (dispatch:Dispatch) {
        dispatch({
            type: GET_FEED
        })
        fetch(`${BASE_URL}/ingredients`).then(checkResponse)
        .then(data => 
            dispatch({
                type: GET_FEED_SUCCESS,
                items: data.data
            }))
        .catch(err => {
            dispatch({
                type: GET_FEED_FAILED
            })
        })
    }
}