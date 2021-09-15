import { filmActionTypes } from '../film/film.types'

const INITIAL_STATE = {
    bannerData: [],
    trending: '',
    popular: ''
}

const filmReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case filmActionTypes.SET_BANNER_DATA:
            return {
                ...state,
                bannerData: action.payload
            }

        case filmActionTypes.SET_TRENDING:
            return {
                ...state,
                trending: action.payload
            }
        case filmActionTypes.SET_POPULAR:
            return {
                ...state,
                popular: action.payload
            }

        default:
            return state
    }
}

export default filmReducer;