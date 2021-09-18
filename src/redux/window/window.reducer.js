import { windowActionTypes } from '../window/window.types'

const INITIAL_STATE = {
    windowHeight: 0,
    windowWidth: 0,
    modalActive: false
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

        case windowActionTypes.SET_MODAL_STATE:
            return {
                ...state,
                modalActive: action.payload
            }

        default:
            return state
    }
}

export default windowReducer;