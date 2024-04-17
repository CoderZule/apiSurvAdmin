import axios from 'axios';


export const loginUser = (user) => async dispatch => {

    dispatch({ type: 'USER_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/user/login', user)
        console.log(response);
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href = '/admin/dashboard'
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error })
    }

}


export const logoutUser = () => dispatch => {


    localStorage.removeItem('currentUser')
 
    window.location.href = '/'

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

