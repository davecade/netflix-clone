import { filmActionTypes } from "./film.types";

export const fetchDataStart = () => ({
    type: filmActionTypes.FETCH_DATA_START
})

export const setBannerData = image => ({
    type: filmActionTypes.SET_BANNER_DATA,
    payload: image
})

export const setMovies = films => ({
    type: filmActionTypes.SET_MOVIES,
    payload: films
})

export const startLoading = () => ({
    type: filmActionTypes.START_LOADING
})

export const fetchDataSuccess = () => ({
    type: filmActionTypes.FETCH_DATA_SUCCESS
})

export const fetchDataFailure = error => ({
    type: filmActionTypes.FETCH_DATA_FAILURE,
    payload: error
})