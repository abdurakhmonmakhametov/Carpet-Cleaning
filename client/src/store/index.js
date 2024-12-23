import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slice/auth'
import UsersReducer from '../slice/allUsers'


export default configureStore({
    reducer: {
        auth: AuthReducer,
        users: UsersReducer
    }
})