import loggedReducers from "./isLogged"
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    isLogged : loggedReducers,

})

export default allReducers

