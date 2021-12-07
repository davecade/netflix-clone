import { takeLatest, put, all, call } from "redux-saga/effects";
import { filmActionTypes } from "./film.types";
import movieTrailer from "movie-trailer";
import axios from "axios";
import {
    setBannerData,
    setMovies,
    startLoading,
    fetchDataSuccess,
    fetchDataFailure,
    setSelectedMovie,
} from "./film.actions";

export function* fetchDataStartAsync() {
    try {
        yield put(startLoading());

        const getData = yield axios.get("/movies");
        const dataObject = getData.data;

        yield put(setBannerData(dataObject.bannerData));
        yield put(setMovies(dataObject.homepageData));
        yield put(fetchDataSuccess());
    } catch (error) {
        yield put(fetchDataFailure(error));
    }
}

export function* getSelectedMovieAsync({ payload: { title, id, movieID } }) {
    try {
        if (title) {
            let fetchMovieTrailer = yield movieTrailer(title || "");
            let fetchBannerData = yield axios.get(`/movies/${movieID}`);
            let bannerData = fetchBannerData.data.bannerData;
            yield put(
                setSelectedMovie({
                    url: fetchMovieTrailer,
                    id: id,
                    title: title,
                })
            );
            yield put(setBannerData(bannerData));
        } else {
            yield put(setSelectedMovie({ url: "", id: "", title: "" }));
        }
    } catch (error) {
        console.log(error);
    }
}

export function* onFetchDataStart() {
    yield takeLatest(filmActionTypes.FETCH_DATA_START, fetchDataStartAsync);
}

export function* onGetSelectedMovie() {
    yield takeLatest(filmActionTypes.GET_SELECTED_MOVIE, getSelectedMovieAsync);
}

export function* filmSagas() {
    yield all([call(onFetchDataStart), call(onGetSelectedMovie)]);
}
