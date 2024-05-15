import {
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_RECOMENDETIONS_REQUEST,
  GET_RECOMENDETIONS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_SUCCESS,
} from "./authenticationType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  searchUsers: [],
  recommendUsers: [] ,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_RECOMENDETIONS_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGOUT_SUCCESS:
      return { ...state, jwt: null, error: null, loading: false, user: null };
    case GET_RECOMENDETIONS_SUCCESS:
      return { ...state, error: null, loading: false, recommendUsers: action.payload };
    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUsers: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, jwt: action.payload, loading: false, error: null };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
