import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createUserReducer, loginUserReducer, getAllUsersReducer, getUserByIdReducer, editUserReducer } from './reducers/userReducer'

import {createForageReducer, getForageByIdReducer, editForageReducer, getAllForagesReducer} from './reducers/forageReduer'

const finalReducer = combineReducers({

    //User Reducer
    loginUserReducer: loginUserReducer,
    createUserReducer: createUserReducer,
    getUserByIdReducer: getUserByIdReducer,
    editUserReducer: editUserReducer,
    getAllUsersReducer: getAllUsersReducer,

    //Forage Reducer
    createForageReducer: createForageReducer,
    getForageByIdReducer:getForageByIdReducer,
    editForageReducer:editForageReducer,
    getAllForagesReducer:getAllForagesReducer
  


})

const storedData = localStorage.getItem('currentUser');
const { currentUser, token } = storedData ? JSON.parse(storedData) : { currentUser: null, token: null };


 
const initialState = {
    loginUserReducer: {
        currentUser: currentUser,
        token: token
    }
};

const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store