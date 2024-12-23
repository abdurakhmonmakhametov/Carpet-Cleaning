import axios from "./api"

const AuthService = {
    postUser: async(user) => {   
        const res = await axios.post('/auth/authenticate', user);
        return res; 
    },

    getUser: async() => {
        const {data} = await axios.get('/employees/current_employee');        
        return data
    }
}

export default AuthService