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

export const createApiary = (apiary) => async (dispatch) => {
    dispatch({ type: 'APIARY_CREATE_REQUEST' });
    try {
        const response = await axios.post('/api/apiary/create', apiary);
        console.log(response);
        dispatch({ type: 'APIARY_CREATE_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'APIARY_CREATE_FAILED', payload: error});
    }
}

export const getApiaryById = (apiaryId) => async dispatch => {
    dispatch({ type: 'GET_APIARYBYID_REQUEST' })

    try {
        const response = await axios.get(`/api/apiary/getApiaryById/${apiaryId}`);
        dispatch({ type: 'GET_APIARYBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_APIARYBYID_FAILED', payload: error })
    }
}


export const editApiary = (editedApiary) => async (dispatch) => {
    dispatch({ type: 'EDIT_APIARY_REQUEST' });
    try {
        const response = await axios.post('/api/apiary/editApiary', editedApiary);
        console.log(response);
        dispatch({ type: 'EDIT_APIARY_SUCCESS' });
        window.location.href = '/admin/apiaries'
    } catch (error) {
        dispatch({ type: 'EDIT_APIARY_FAILED', payload: error });
    }
};


export const deleteApiary = (apiaryid) => async dispatch => {
    try {
        const response = await axios.post('/api/apiary/deleteApiary', { apiaryid })
        alert('Rucher supprimé avec succès')
        console.log(response);
        window.location.reload()
    } catch (error) {
         console.log(error);
    }
}




