const showSpecs = (state = true, action) => {
    switch (action.type){
        case "SHOW_SPECS":
            if(action.show == "specs") return true
            return false
        default:
            return state
    }
}

export default showSpecs