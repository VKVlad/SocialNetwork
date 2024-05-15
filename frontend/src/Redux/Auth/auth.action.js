import axios from "axios";
import { API_BASE_URL, api } from "../../config/api";
import {
  CONFIRM_USER_FAILURE,
  CONFIRM_USER_REQUEST, CONFIRM_USER_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_RECOMENDETIONS_FAILURE,
  GET_RECOMENDETIONS_REQUEST,
  GET_RECOMENDETIONS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./authenticationType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signin`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("--------", error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const registerUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST }); 
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      loginData.data
    );
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("--------", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    
    console.log("profile------", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data }); 
  } catch (error) {
    console.log("--------", error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST }); 
  try {
    const { data } = await api.put(
      `${API_BASE_URL}/api/users`, reqData);
    
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.jwt }); 
  } catch (error) {
    console.log("--------", error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error }); 
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST }); 
  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);
  
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data }); 
  } catch (error) {
    console.log("--------", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error }); 
  }
};

export const logoutUserAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST }); 

  try {
    await axios.post(`${API_BASE_URL}/auth/logout`);

    localStorage.removeItem("jwt"); 

    dispatch({ type: LOGOUT_SUCCESS }); 
  } catch (error) {
    console.error("Error logging out:", error);
    dispatch({ type: LOGOUT_FAILURE, payload: error }); 
  }
};

export const getRecomendationAction = () => async (dispatch) => {
  dispatch({ type: GET_RECOMENDETIONS_REQUEST }); 
  try {
    const { data } = await api.get(`/api/users/recommendations`);
  
    dispatch({ type:GET_RECOMENDETIONS_SUCCESS, payload: data }); 
  } catch (error) {
    console.log("--------", error);
    dispatch({ type: GET_RECOMENDETIONS_FAILURE, payload: error }); 
  }
};
