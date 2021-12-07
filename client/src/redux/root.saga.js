import { all, call } from "redux-saga/effects";
import { filmSagas } from "./film/film.sagas";

export default function* rootSaga() {
    yield all([call(filmSagas)]);
}
