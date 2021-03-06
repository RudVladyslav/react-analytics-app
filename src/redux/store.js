import rootReducer from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk"


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


window.store = store
export default store