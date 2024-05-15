import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  GET_USERS_SAVED_POST_FAILURE,
  GET_USERS_SAVED_POST_REQUEST,
  GET_USERS_SAVED_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  save: null,
  comments: [],
  newComment: null,
  userPosts: [],
  savedPosts: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case SAVE_POST_REQUEST:
    case CREATE_COMMENT_REQUEST:
    case GET_USERS_POST_REQUEST:
    case GET_USERS_SAVED_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return { ...state, error: null, loading: true };

    case GET_USERS_SAVED_POST_SUCCESS:
      return {
        ...state,
        savedPosts: action.payload,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };

    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        userPosts: action.payload,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        comments: action.payload.comments,
        loading: false,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        userPosts: state.userPosts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        savedPosts: state.savedPosts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        comments: action.payload,
        loading: false,
        error: null,
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        save: action.payload,
        posts: state.posts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        userPosts: state.userPosts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        savedPosts: state.savedPosts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        comments: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case SAVE_POST_FAILURE:
    case CREATE_COMMENT_FAILURE:
    case GET_USERS_SAVED_POST_FAILURE:
    case DELETE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
