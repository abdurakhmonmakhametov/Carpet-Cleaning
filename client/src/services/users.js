import axios from "./api"

const UsersService = {
    getUsers: async() => {   
        const res = await axios.get('/employees');
        return res; 
    },
    createUser: async(user) => {  
        const res = await axios.post('/employees/create_employee', user);
        return res; 
    },
    deleteUser: async(id) => {   
        const res = await axios.delete(`/employees/${id}`);
        return res; 
    },
    updateFullName: async(id, name, surname) => {   
        const res = await axios.put(`/employees/update_full_name/${id}`, {name, surname});
        return res; 
    },
    updateUsername: async(id, username) => {
        const res = await axios.put(`/employees/update_username/${id}`, {username});
        return res; 
    },
    updatePassword: async(id, oldPassword, newPassword) => {
        const res = await axios.put(`/employees/update_password/${id}`, {oldPassword, newPassword});
        return res;  
    },
    updatePhoneNumber: async(id, phoneNumber) => {
        const res = await axios.put(`/employees/update_phone_number/${id}`, {phoneNumber});
        return res;
    },
    updateRole: async(id, role) => {
        const res = await axios.put(`/employees/update_role/${id}`, {role});
        return res;
    },
    getEditUser: async(id) => {
        const res = await axios.get(`/employees/${id}`);
        return res;
    }
}

export default UsersService