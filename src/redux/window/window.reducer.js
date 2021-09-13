import { windowActionTypes } from '../window/window.types'

const INITIAL_STATE = {
    windowHeight: 0,
    windowWidth: 1410
}

const windowReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case windowActionTypes.SET_WINDOW_HEIGHT:
            return {
                ...state,
                windowHeight: action.payload
            }

        case windowActionTypes.SET_WINDOW_WIDTH:
            return {
                ...state,
                windowWidth: action.payload
            }

        default:
            return state
    }
}

export default windowReducer;