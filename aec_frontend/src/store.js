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
    postAddReducer,
    networkReducer,
    postInteractionReducer,
    toPremiumReducer,
    SuggestionReducer,
    getOtherUserProfileReducer,
    userConnectUsReducer,
    userConnectUsRequestReducer
} from './reducers/userReducer'

import {
    allUserListReducer,
    statusChangeReducer,
    allProfileRequestsReducer,
    allPostListReducer,
    ProfileRequestActionReducer,
    ClientRequirementActionReducer,
    allClientRequiremntListReducer
} from './reducers/adminReducer'



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
    topremium:toPremiumReducer,
    suggestion:SuggestionReducer,
    othersprofile:getOtherUserProfileReducer,
    connectUs:userConnectUsReducer,
    allConnectrequest:userConnectUsRequestReducer,



    allUsers: allUserListReducer,
    statusChanger: statusChangeReducer,
    allProfRequests: allProfileRequestsReducer,
    allPosts:allPostListReducer,
    profilerequestaction:ProfileRequestActionReducer,
    allClientRequirements:allClientRequiremntListReducer,
    clientRequirementAction:ClientRequirementActionReducer,


    
    postInteraction:postInteractionReducer,
    network:networkReducer,



})

const persistedReducer = persistReducer(persistConfig, reducers)
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null



const initialState = {
    userLoginInfo: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = configureStore({ reducer: persistedReducer }, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
