import axios from 'axios';


export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    try {
        const response = await axios.post('/api/user/login', user);
        const { currentUser, token } = response.data;

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: { currentUser, token }
        });

        localStorage.setItem('currentUser', JSON.stringify({ currentUser, token }));
     } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error });
    }
};

 

export const logoutUser = () => (dispatch) => {
    // Remove currentUser and token from localStorage
    localStorage.removeItem('currentUser');

    // Dispatch USER_LOGOUT action to reset Redux state
    dispatch({ type: 'USER_LOGOUT' });

    // Redirect user to home page after a short delay
    setTimeout(() => {
        window.location.href = '/';
    }, 100); // Adjust delay as needed
};




export const createUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_CREATE_REQUEST' });
    try {
        const response = await axios.post('/api/user/create', user);
        console.log(response);
        dispatch({ type: 'USER_CREATE_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'USER_CREATE_FAILED', payload: error });
    }
}



export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'GET_USERS_REQUEST' })
    try {
        const response = await axios.get('/api/user/getAllUsers')
        console.log(response);
        dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_USERS_FAILED', payload: error })

    }

}

export const getUserById = (userId) => async dispatch => {
    dispatch({ type: 'GET_USERBYID_REQUEST' })

    try {
        const response = await axios.get(`/api/user/getUserById/${userId}`);
        dispatch({ type: 'GET_USERBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_USERBYID_FAILED', payload: error })
    }
}


export const editUser = (editedUser) => async (dispatch) => {
    dispatch({ type: 'EDIT_USER_REQUEST' });
    try {
        const response = await axios.post('/api/user/editUser', editedUser);
        console.log(response);
        dispatch({ type: 'EDIT_USER_SUCCESS' });
        window.location.href = '/admin/users'
    } catch (error) {
        dispatch({ type: 'EDIT_USER_FAILED', payload: error });
    }
};


export const deleteUser = (userid) => async dispatch => {
    try {
        const response = await axios.post('/api/user/deleteUser', { userid })
        alert('Utilisateur supprimé avec succès')
        console.log(response);
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

