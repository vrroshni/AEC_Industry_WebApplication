import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducer'



const reducers = combineReducers({

    userLogin: userLoginReducer,

})
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null



const initialState = {
    userLoginInfo:{userInfo:userInfoFromStorage}

}

const middleware = [thunk]

const store = configureStore({reducer:reducers}, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store




// ...
// let reducers = combineReducers({
//      book: booking_reducer,
//      admin: admin_reducer,
// })

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = configureStore(
//         {reducer:reducers},
//         composeEnhancers(
//             applyMiddleware(thunkMiddleware)
//         )
//     );
// ...