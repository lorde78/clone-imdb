import { combineReducers } from "redux";
import RegisterReducer from "./RegisterReducer";
import SigninReducer from "./SignInReducer";

export const RootReducer = combineReducers({
    RegisterReducer,
    SigninReducer
})