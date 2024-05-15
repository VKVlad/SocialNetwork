import { CREATE_CHAT_SUCCESS, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_SUCCESS, GET_MESSAGES_CHAT_FAILURE, GET_MESSAGES_CHAT_REQUEST, GET_MESSAGES_CHAT_SUCCESS } from "./message.actionType";

const initialState = {
    messages:[],
    chats:[],
    loading:false,
    error:null,
    message:null
  };
  
  export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_MESSAGE_SUCCESS:
        return { ...state, message: [action.payload, ...state.messages] };
      case CREATE_CHAT_SUCCESS:
        return { ...state, chats: [action.payload, ...state.chats] };
      case GET_ALL_CHATS_SUCCESS:
        return { ...state, chats: action.payload };
      case GET_MESSAGES_CHAT_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_MESSAGES_CHAT_SUCCESS:
        return { ...state, loading: false, messages: action.payload };
      case GET_MESSAGES_CHAT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  