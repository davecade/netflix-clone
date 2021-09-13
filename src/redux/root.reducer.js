import { combineReducers } from 'redux'
import windowReducer from './window/window.reducer'

export default combineReducers({
    window: windowReducer,
})