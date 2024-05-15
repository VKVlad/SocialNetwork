import { api } from "../../config/api";
import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, DELETE_REEL_FAILURE, DELETE_REEL_REQUEST, DELETE_REEL_SUCCESS, GET_ALL_REEL_FAILURE, GET_ALL_REEL_REQUEST, GET_ALL_REEL_SUCCESS, GET_USERS_REEL_FAILURE, GET_USERS_REEL_REQUEST, GET_USERS_REEL_SUCCESS } from "./reel.actionType";

export const createReelAction = (reelData) => async (dispatch) => {
    dispatch({ type: CREATE_REEL_REQUEST });
    try {
      const { data } = await api.post("/api/reels", reelData);
      dispatch({ type: CREATE_REEL_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: CREATE_REEL_FAILURE, payload: error });
    }
  };
  
  export const deleteReelAction = (reelId) => async (dispatch) => {
    dispatch({ type: DELETE_REEL_REQUEST });
    try {
      const { data } = await api.delete(`/api/reels/${reelId}`);
      dispatch({ type: DELETE_REEL_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: DELETE_REEL_FAILURE, payload: error });
    }
  };
  
  export const getAllReelsAction = () => async (dispatch) => {
      dispatch({ type: GET_ALL_REEL_REQUEST });
      try {
        const { data } = await api.get("/api/reels");
        dispatch({ type: GET_ALL_REEL_SUCCESS, payload: data });
      } catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_ALL_REEL_FAILURE, payload: error });
      }
    };
  
    export const getUsersReelsAction = (userId) => async (dispatch) => {
      dispatch({ type: GET_USERS_REEL_REQUEST });
      try {
        const { data } = await api.get(`/api/reels/user/${userId}`);
        dispatch({ type: GET_USERS_REEL_SUCCESS, payload: data });
      } catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_USERS_REEL_FAILURE, payload: error });
      }
    };