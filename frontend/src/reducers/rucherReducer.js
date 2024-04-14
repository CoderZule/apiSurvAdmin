export const getAllRuchersReducer = (state = { ruchersarr: [] }, action) => {
    switch (action.type) {
        case 'GET_RUCHERS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_RUCHERS_SUCCESS': return {
            loading: false,
            ruchersarr: action.payload
        }
        case 'GET_RUCHERS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }
}