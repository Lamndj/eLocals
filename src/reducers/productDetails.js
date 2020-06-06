let initialState = {
    details:[]
}

const productReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_PRODUCT_DETAILS":
            return {
                ...state,
                details: action.payload
            };
        default:
            return state
    }
}

export default productReducer