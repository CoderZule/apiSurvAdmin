import axios from "axios";

export const getAllHives = () => async dispatch => {
    dispatch({ type: 'GET_HIVES_REQUEST' })
    try {
        const response = await axios.get('/api/hive/getAllHives')
        console.log(response);
        dispatch({ type: 'GET_HIVES_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_HIVES_FAILED', payload: error })

    }

}

export const createHive = (hive) => async (dispatch) => {
    dispatch({ type: 'HIVE_CREATE_REQUEST' });
    try {
        const response = await axios.post('/api/hive/create', hive);
        console.log(response);
        dispatch({ type: 'HIVE_CREATE_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'HIVE_CREATE_FAILED', payload: error});
    }
}

export const getHiveById = (hiveId) => async dispatch => {
    dispatch({ type: 'GET_HIVEBYID_REQUEST' })

    try {
        const response = await axios.get(`/api/hive/getHiveById/${hiveId}`);
        dispatch({ type: 'GET_HIVEBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_HIVEBYID_FAILED', payload: error })
    }
}


export const editHive = (editedHive) => async (dispatch) => {
    dispatch({ type: 'EDIT_HIVE_REQUEST' });
    try {
        const response = await axios.post('/api/hive/editHive', editedHive);
        console.log(response);
        dispatch({ type: 'EDIT_HIVE_SUCCESS' });
        window.location.href = '/admin/hives'
    } catch (error) {
        dispatch({ type: 'EDIT_HIVE_FAILED', payload: error });
    }
};


export const deleteHive = (hiveid) => async dispatch => {
    try {
        const response = await axios.post('/api/hive/deleteHive', { hiveid })
        alert('Ruche supprimée avec succès')
        console.log(response);
        window.location.reload()
    } catch (error) {
         console.log(error);
    }
}




