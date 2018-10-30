import {combineReducers} from "redux"
import appReducer from "./appReducer"



const allReducers = combineReducers({
    appReducer,
});

export default allReducers;