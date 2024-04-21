import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createUserReducer, loginUserReducer, getAllUsersReducer, getUserByIdReducer, editUserReducer } from './reducers/userReducer'
import { getAllApiariesReducer , createApiaryReducer, getApiaryByIdReducer, editApiaryReducer } from './reducers/apiaryReducer'
import {getAllHivesReducer, getHiveByIdReducer, editHiveReducer, createHiveReducer} from './reducers/hiveReducer';



const finalReducer = combineReducers({

    //User Reducer
    loginUserReducer: loginUserReducer,
    createUserReducer: createUserReducer,
    getUserByIdReducer: getUserByIdReducer,
    editUserReducer: editUserReducer,
    getAllUsersReducer: getAllUsersReducer,

    //Apiary Reducer
    getAllApiariesReducer : getAllApiariesReducer,
    getApiaryByIdReducer: getApiaryByIdReducer,
    editApiaryReducer: editApiaryReducer,
    createApiaryReducer: createApiaryReducer,

    //Hive Reducer
    getAllHivesReducer: getAllHivesReducer,
    getHiveByIdReducer: getHiveByIdReducer,
    editHiveReducer: editHiveReducer,
    createHiveReducer: createHiveReducer



})

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const initialState = {
    loginUserReducer: {
        currentUser: currentUser
    }
}

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store