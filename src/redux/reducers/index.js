import {combineReducers} from "redux";
import authReducer from "./authReducer";
import analyticsReducer from "./analyticsReducer";

const rootReducer = combineReducers({
    analyticData: analyticsReducer,
    auth: authReducer
})

export default rootReducer