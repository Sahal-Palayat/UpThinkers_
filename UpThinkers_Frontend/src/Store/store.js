import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {configureStore} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import userAuthSlice from './userAuthSlice'
import tutorAuthSlice from './tutorAuthSlice'



const rootReducer = combineReducers({
    user:userAuthSlice,
    tutor:tutorAuthSlice
})

const persistConfig= {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer:persistedReducer
})

export default store