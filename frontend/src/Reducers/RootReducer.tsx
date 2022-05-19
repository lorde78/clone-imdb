import { combineReducers } from "redux";
import RegisterReducer from "./RegisterReducer";
import SignInReducer from "./SignInReducer";

export const RootReducer = combineReducers({
    RegisterReducer,
    SignInReducer
})