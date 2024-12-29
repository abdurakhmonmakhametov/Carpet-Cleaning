import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    customers: [],
    editCustomerData: [],
    success: null,
    error: null,
    isLoading: false
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        getCustomersStart: (state) => {
			state.isLoading = true;
		},
		getCustomersSuccess: (state, actions) => {
			state.isLoading = false;
            state.customers = actions.payload;
		},
		getCustomersFail: (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		},
        getCustomerStart: (state) => {
            state.isLoading = true;
        },
        getCustomerSuccess: (state, actions) => {
            state.isLoading = false;
            state.editCustomerData = actions.payload;
        },
        getCustomerFail: (state, actions) => {
            state.isLoading = false;
            state.error = actions.payload;
        },
        createCustomerStart: (state) => {
            state.isLoading = true;
        },
        createCustomerSuccess: (state, actions) => {
            state.isLoading = false;
            state.editCustomerData = actions.payload;
        },
        createCustomerFail: (state, actions) => {
            state.isLoading = false;
            state.error = actions.payload;
        },
        editCustomersFail: (state, actions) => {
            state.error = actions.payload;
        }
    },
})

export const {
	getCustomersStart,
	getCustomersSuccess,
	getCustomersFail,
	getCustomerStart,
	getCustomerSuccess,
	getCustomerFail,
    createCustomerStart,
    createCustomerSuccess,
    createCustomerFail,
    editCustomersFail
} = customersSlice.actions;
export default customersSlice.reducer