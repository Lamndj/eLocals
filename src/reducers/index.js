import {combineReducers} from "redux"
import productDetailsReducer from "./productDetails"
import otherSellersReducer from "./otherSellers"
import showSpecsReducer from "./specs"

const allReducers = combineReducers({
    products:productDetailsReducer,
    sellers:otherSellersReducer,
    specs:showSpecsReducer,
})

export default allReducers