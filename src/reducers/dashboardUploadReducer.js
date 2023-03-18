export const UPLOAD_INITIAL_STATE = {
    courseName: "",
    price: "",
    security: "",
    tags: "",
    title: ""
}

export const dashboardUploadReducer = (state, action) => {
    switch(action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: [action.payload.value]
            }
        default: 
            return state
    }
}