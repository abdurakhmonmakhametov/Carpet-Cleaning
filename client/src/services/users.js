import axios from "./api"

const UsersService = {
    getUsers: async() => {   
        const res = await axios.get('/employees');
        return res; 
    },
    createUser: async(user) => {
        console.log(user);   
        const res = await axios.post('employees/create_employee', user);
        return res; 
    },
}

export default UsersService