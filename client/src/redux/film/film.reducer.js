import { filmActionTypes } from '../film/film.types'

const INITIAL_STATE = {
    bannerData: [],
    movies: [],
    selectedMovie: {id: '', title: '', url: ''},
    loading: false,
    error: null
}

const filmReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case filmActionTypes.SET_BANNER_DATA:
            return {
                ...state,
                bannerData: action.payload
            }

        case filmActionTypes.SET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case filmActionTypes.SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload
            }
        
        case filmActionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case filmActionTypes.FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export default filmReducer;