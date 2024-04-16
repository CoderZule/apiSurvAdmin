import axios from "axios";

export const getAllApiaries = () => async dispatch => {
    dispatch({ type: 'GET_APIARIES_REQUEST' })
    try {
        const response = await axios.get('/api/apiary/getAllApiaries')
        console.log(response);
        dispatch({ type: 'GET_APIARIES_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_APIARIES_FAILED', payload: error })

    }

}


