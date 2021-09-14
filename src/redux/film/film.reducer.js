import { filmActionTypes } from '../film/film.types'

const INITIAL_STATE = {
    bannerImage: '',
    trending: '',
    popular: ''
}

const filmReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case filmActionTypes.SET_BANNER_IMAGE:
            return {
                ...state,
                bannerImage: action.payload
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