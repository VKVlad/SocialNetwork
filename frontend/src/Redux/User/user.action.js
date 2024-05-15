
import { FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_PROFILE_BY_ID_FAILURE, GET_PROFILE_BY_ID_REQUEST, GET_PROFILE_BY_ID_SUCCESS } from "./user.actionType";
import { api } from "../../config/api";
import { FOLLOW_USER_REQUEST } from "./user.actionType";

export const getProfileByIdAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/users/${userId}`);
      dispatch({ type: GET_PROFILE_BY_ID_SUCCESS, payload: data });
      console.log("user-----", data)
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_PROFILE_BY_ID_FAILURE, payload: error });
    }
  };

  export const followUserAction = (userId) => async (dispatch) => {
    dispatch({ type: FOLLOW_USER_REQUEST });
    try {
      const { data } = await api.put(`/api/users/follow/${userId}`);
      dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: FOLLOW_USER_FAILURE, payload: error });
    }
  };