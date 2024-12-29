import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    editUserData: [],
    success: null,
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
        deleteUserStart: (state) => {
            state.isLoading = true;
        },
        deleteUserSuccess: (state, actions) => {
            state.users = state.users.filter(user => user.id !== actions.payload);
            state.isLoading = false;
        },
        deleteUserFail: (state, actions) => {
            state.error = actions.payload;
            state.isLoading = false;
        },
        editUser: (state, actions) => {
            state.editUserData = actions.payload;
        },
        // editUserSuccess: (state, actions) => {
        //     state.success = actions.payload
        // },
        editUserFail: (state, actions) => {
            state.error = actions.payload
        }
	},
});

export const {
	getUsersStart,
	getUsersFail,
	getUsersSuccess,
	createUserFail,
	createUserStart,
	createUserSuccess,
	deleteUserFail,
	deleteUserStart,
	deleteUserSuccess,
    editUser,
    editUserFail,
    editUserSuccess,
} = usersSlice.actions;
export default usersSlice.reducer;