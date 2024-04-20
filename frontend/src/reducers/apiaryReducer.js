export const createApiaryReducer = (state = {}, action) => {


    switch (action.type) {
        case 'APIARY_CREATE_REQUEST': return {
            loading: true,
            ...state
        }
        case 'APIARY_CREATE_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'APIARY_CREATE_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getAllApiariesReducer = (state = { apiaries: [] }, action) => {
    switch (action.type) {
        case 'GET_APIARIES_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_APIARIES_SUCCESS': return {
            loading: false,
            apiaries: action.payload
        }
        case 'GET_APIARIES_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}


export const getApiaryByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_APIARYBYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_APIARYBYID_SUCCESS': return {
            loading: false,
            apiary: action.payload
        }
        case 'GET_APIARYBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}



export const editApiaryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_APIARY_REQUEST': return {
            editloading: true,
            ...state
        }
        case 'EDIT_APIARY_SUCCESS': return {
            editloading: false,
            editsuccess: true,
        }
        case 'EDIT_APIARY_FAILED': return {
            editerror: action.payload,
            editloading: false
        }
        default: return state
    }

}