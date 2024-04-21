export const createHiveReducer = (state = {}, action) => {


    switch (action.type) {
        case 'HIVE_CREATE_REQUEST': return {
            loading: true,
            ...state
        }
        case 'HIVE_CREATE_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'HIVE_CREATE_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getAllHivesReducer = (state = { hives: [] }, action) => {
    switch (action.type) {
        case 'GET_HIVES_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_HIVES_SUCCESS': return {
            loading: false,
            hives: action.payload
        }
        case 'GET_HIVES_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}


export const getHiveByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_HIVEBYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_HIVEBYID_SUCCESS': return {
            loading: false,
            hive: action.payload
        }
        case 'GET_HIVEBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}



export const editHiveReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_HIVE_REQUEST': return {
            editloading: true,
            ...state
        }
        case 'EDIT_HIVE_SUCCESS': return {
            editloading: false,
            editsuccess: true,
        }
        case 'EDIT_HIVE_FAILED': return {
            editerror: action.payload,
            editloading: false
        }
        default: return state
    }

}