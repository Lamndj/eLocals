export const storeProductDetails = (data) => {
    return{
        type:"GET_PRODUCT_DETAILS",
        payload:data
    }
}

export const storeSellerDetails = (data) => {
    return{
        type:"GET_SELLER_DETAILS",
        payload:data
    }
}

export const showSpecs = (show) => {
    return{
        type:"SHOW_SPECS",
        show
    }
}