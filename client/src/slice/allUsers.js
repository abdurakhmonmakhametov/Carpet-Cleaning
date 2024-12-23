import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    error: null,
    isLoading: false
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		getUsersStart: (state) => {
			state.isLoading = true;
		},
		getUsersSuccess: (state, actions) => {
			state.isLoading = false;
            state.users = actions.payload;
		},
		getUsersFail: (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		},
        createUserStart: (state) => {
            state.isLoading = true;
        },
        createUserSuccess: (state, actions) => {
            state.isLoading = false;
            state.users = [...state.users, actions.payload];
        },
        createUserFail: (state, actions) => {
            state.isLoading = false;
            state.error = actions.payload;
        },
	},
});

export const { getUsersStart, getUsersFail, getUsersSuccess, createUserFail, createUserStart, createUserSuccess } = usersSlice.actions;
export default usersSlice.reducer;