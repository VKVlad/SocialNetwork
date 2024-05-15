import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_PROFILE_BY_ID_FAILURE, GET_PROFILE_BY_ID_REQUEST, GET_PROFILE_BY_ID_SUCCESS } from "./user.actionType";


const initialState = {
  error: null,
  loading: false,
  userProfile: null,
  follow: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_BY_ID_REQUEST:
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_BY_ID_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        error: null,
        loading: false,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        follow: [...state.follow, action.payload],
        error: null,
        loading: false,
      };
    case GET_PROFILE_BY_ID_FAILURE:
    case FOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
