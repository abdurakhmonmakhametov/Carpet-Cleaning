import { createSlice } from '@reduxjs/toolkit';
import { getItem, removeItem, setItem } from "../helpers/persistance-storage";

const initialState = {
    isLoading: false,
    loggedIn: getItem('bearer') ? true : false,
    error: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUserStart: state => {
            state.isLoading = true
        },
        signUserSuccess: (state, actions) => {
            state.isLoading = false
            state.loggedIn = true
            setItem('bearer', actions.payload.token)
        },
        signUserFail: (state, actions) => {
            state.isLoading = false
            state.error = actions.payload
        },
        logoutUser: state => {
            state.loggedIn = false
            state.user = null
            removeItem('bearer')
        },
        getUserStart: state => {
            state.isLoading = true
        },
        getUserSuccess: (state, actions) => {
            state.isLoading = false
            state.user = actions.payload
        },
        getUserFail: (state, actions) => {
            state.isLoading = false
            state.error = actions.payload
            removeItem('bearer')
            state.loggedIn = false
        }
    }
})

export const {signUserFail, signUserStart, signUserSuccess, logoutUser, getUserStart, getUserSuccess, getUserFail} = authSlice.actions
export default authSlice.reducer