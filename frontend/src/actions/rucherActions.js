import axios from "axios";

export const getAllRuchers = () => async dispatch => {
    dispatch({ type: 'GET_RUCHERS_REQUEST' })
    try {
        const response = await axios.get('api/getAllRuchers')
        console.log(response);
        dispatch({ type: 'GET_RUCHERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_RUCHERS_FAILED', payload: error })

    }

}


