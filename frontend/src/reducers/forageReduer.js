
export const createForageReducer = (state = {}, action) => {


    switch (action.type) {
        case 'FORAGE_CREATE_REQUEST': return {
            loading: true,
            ...state
        }
        case 'FORAGE_CREATE_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'FORAGE_CREATE_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getAllForagesReducer = (state = { forages: [] }, action) => {
    switch (action.type) {
        case 'GET_FORAGES_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_FORAGES_SUCCESS': return {
            loading: false,
            forages: action.payload
        }
        case 'GET_FORAGES_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}


export const getForageByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_FORAGEBYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_FORAGEBYID_SUCCESS': return {
            loading: false,
            forage: action.payload
        }
        case 'GET_FORAGEBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}



export const editForageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_FORAGE_REQUEST': return {
            editloading: true,
            ...state
        }
        case 'EDIT_FORAGE_SUCCESS': return {
            editloading: false,
            editsuccess: true,
        }
        case 'EDIT_FORAGES_FAILED': return {
            editerror: action.payload,
            editloading: false
        }
        default: return state
    }

}