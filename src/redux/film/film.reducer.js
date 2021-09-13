import { filmActionTypes } from '../film/film.types'

const INITIAL_STATE = {
    bannerImage: ''
}

const filmReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case filmActionTypes.SET_BANNER_IMAGE:
            return {
                ...state,
                bannerImage: action.payload
            }

        default:
            return state
    }
}

export default filmReducer;