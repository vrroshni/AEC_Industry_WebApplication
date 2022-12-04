import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    profileverificationReducer,
    getUserProfileReducer,
    updateUserProfileReducer,
    FeedReducer,
    postAddReducer
} from './reducers/userReducer'

import {
    allUserListReducer,
    statusChangeReducer,
    allProfileRequestsReducer
} from './reducers/adminReducer'
import {
    alertCreateReducer
} from './reducers/alertReducer'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
// import logger from 'redux-logger'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducers = combineReducers({

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfileVerification: profileverificationReducer,
    getUserProfile: getUserProfileReducer,
    updateUserprofile: updateUserProfileReducer,
    addPost: postAddReducer,
    allposts: FeedReducer,


    allUsers: allUserListReducer,
    statusChanger: statusChangeReducer,
    allProfRequests: allProfileRequestsReducer,

    alerts:alertCreateReducer

})

const persistedReducer = persistReducer(persistConfig, reducers)
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null



const initialState = {
    userLoginInfo: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = configureStore({ reducer: persistedReducer }, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
