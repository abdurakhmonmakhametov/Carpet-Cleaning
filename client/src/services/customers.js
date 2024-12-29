import axios from './api';

const CustomersService = {
    getCustomers: async() => {
        const res =  await axios.get('/customers');
        return res;
    },
    getByPhone: async(phoneNumber) => {
        const res = await axios.post('/customers/get_by_phone', { phoneNumber})
        return res;
    },

    getById: async(id) => {
        const res = await axios.get(`/customers/${id}`);
        return res;
    },

    createCustomer: async(customer) => {
        const res = await axios.post('/customers', customer);
        return res;
    },
    deleteCustomer: async(id) => {
        const res = await axios.delete(`/customers/${id}`);
        return res;
    },
    updateFullName: async(id, name, surname) => {
        const res = await axios.put(`/customers/update_full_name/${id}`, {name, surname});
        return res;
    },
    updatePhoneNumber: async(id, phoneNumber, extraPhoneNumber) => {
        const res = await axios.put(`/customers/update_phone_number/${id}`, {phoneNumber, extraPhoneNumber});
        return res;
    },
    updateType: async(id, type) => {
        const res = await axios.put(`/customers/update_type/${id}`, {type});
        return res;
    },
    updateLanguage: async(id, language) => {
        const res = await axios.put(`/customers/update_language/${id}`, {language});
        return res;
    },
    updateAddress: async(id, address) => {
        const res = await axios.put(`/customers/update_address/${id}`, {address});
        return res;
    },
    updateNotes: async(id, notes) => {
        const res = await axios.put(`/customers/update_notes/${id}`, {notes});
        return res;
    }
}

export default CustomersService