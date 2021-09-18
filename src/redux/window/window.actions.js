import { windowActionTypes } from '../window/window.types'

export const setWindowHeight = height => ({
    type: windowActionTypes.SET_WINDOW_HEIGHT,
    payload: height
})

export const setWindowWidth = width => ({
    type: windowActionTypes.SET_WINDOW_WIDTH,
    payload: width
})

export const setModalState = state => ({
    type: windowActionTypes.SET_MODAL_STATE,
    payload: state
})