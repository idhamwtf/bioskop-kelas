import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import Tambahcart from './tambahcartReducers'

export default combineReducers({
    Auth:AuthReducers,
    tambahcart:Tambahcart
})