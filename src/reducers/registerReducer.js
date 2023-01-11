export const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
}

export const registerReducer = (state, action) => {
    switch(action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
            
        default: 
                return state;
    }
}