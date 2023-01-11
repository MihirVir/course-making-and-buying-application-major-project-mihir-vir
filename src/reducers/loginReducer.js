export const LOGIN_INITIAL_STATE = {
    email: "",
    password: ""
}

export const loginReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_CHANGE_INPUT": 
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        
        default: 
            return state
    }
}