import { filmActionTypes } from "./film.types";

export const fetchDataStart = () => ({
    type: filmActionTypes.FETCH_DATA_START
})

export const setBannerImage = image => ({
    type: filmActionTypes.SET_BANNER_IMAGE,
    payload: image
})