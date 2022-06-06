import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import libraryReducer from '../features/library/librarySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        library: libraryReducer,
    },
     
}, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())