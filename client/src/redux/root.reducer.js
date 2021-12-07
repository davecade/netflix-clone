import { combineReducers } from "redux";
import windowReducer from "./window/window.reducer";
import filmReducer from "./film/film.reducer";

export default combineReducers({
    window: windowReducer,
    film: filmReducer,
});
