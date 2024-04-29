const initialState = {
    currentUser: null,
    token: null,
    loading: false,
    error: null
};
export const loginUserReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'USER_LOGIN_SUCCESS':
            const { currentUser, token } = action.payload;
            return { ...state, currentUser, token, loading: false };
        case 'USER_LOGIN_FAILED':
            return { ...state, loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return { ...initialState }; // Reset state to initial state
        default:
            return state;
    }
};

export const createUserReducer = (state = {}, action) => {


    switch (action.type) {
        case 'USER_CREATE_REQUEST': return {
            loading: true,
            ...state
        }
        case 'USER_CREATE_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'USER_CREATE_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getAllUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case 'GET_USERS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_USERS_SUCCESS': return {
            loading: false,
            users: action.payload
        }
        case 'GET_USERS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}


export const getUserByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_USERBYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_USERBYID_SUCCESS': return {
            loading: false,
            user: action.payload
        }
        case 'GET_USERBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}



export const editUserReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_USER_REQUEST': return {
            editloading: true,
            ...state
        }
        case 'EDIT_USER_SUCCESS': return {
            editloading: false,
            editsuccess: true,
        }
        case 'EDIT_USER_FAILED': return {
            editerror: action.payload,
            editloading: false
        }
        default: return state
    }

}