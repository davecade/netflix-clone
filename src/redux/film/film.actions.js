import { filmActionTypes } from "./film.types";

export const fetchDataStart = () => ({
    type: filmActionTypes.FETCH_DATA_START
})

export const setBannerData = image => ({
    type: filmActionTypes.SET_BANNER_DATA,
    payload: image
})

export const setTrending = films => ({
    type: filmActionTypes.SET_TRENDING,
    payload: films
})

export const setPopular = films => ({
    type: filmActionTypes.SET_POPULAR,
    payload: films
})