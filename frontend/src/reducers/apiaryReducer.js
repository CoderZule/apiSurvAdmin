export const getAllApiariesReducer = (state = { apiariesarr: [] }, action) => {
    switch (action.type) {
        case 'GET_APIARIES_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_APIARIES_SUCCESS': return {
            loading: false,
            apiariesarr: action.payload
        }
        case 'GET_APIARIES_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}