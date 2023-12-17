import { combineReducers } from "redux";
import movieReducer from "../movieReducer";
import authReducer from "../authReducer";

const rootReducer = combineReducers({
    loginInfo: authReducer,
    movies: movieReducer,
});

export default rootReducer;