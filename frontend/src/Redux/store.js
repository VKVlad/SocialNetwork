import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from 'redux-thunk'; 
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { messageReducer } from "./Message/message.reducer";
import { userReducer } from "./User/user.reducer";
import { reelReducer } from "./Reel/reel.reducer";

const rootReducers=combineReducers({
    auth:authReducer,
    post:postReducer,
    message: messageReducer,
    user: userReducer,
    reel: reelReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))