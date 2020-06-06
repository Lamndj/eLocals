let initialState = {
    sellerDetails:[]
}

const SellerReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_SELLER_DETAILS":
            return {
                ...state,
                sellerDetails: action.payload
            };
        default:
            return state
    }
}

export default SellerReducer