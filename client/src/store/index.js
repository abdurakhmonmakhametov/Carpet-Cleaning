import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../slice/auth'
import UsersReducer from '../slice/allUsers'
import CustomerReducer from '../slice/customers'


export default configureStore({
    reducer: {
        auth: AuthReducer,
        users: UsersReducer,
        customers: CustomerReducer
    }
})