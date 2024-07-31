import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const handleLogin = async (data) => {
    try {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_PY_BASE_URL}/api/auth/login/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };
        const response = await axios.request(config);
        return {
            status: 'success',
            token: response.data.data.token,
        }
    } catch (error) {
        toast.error(error.response.data.error_msg || error.response.data.data.error_msg);
        return;
    }
}


export const handleSignup = async (data) => {
    try {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_PY_BASE_URL}/api/auth/signup/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };

        const response = await axios.request(config);

        console.log("response status code : ", response);

        return {
            status: 'success',
            token: response.data.data.token
        }

    } catch (error) {
        toast.error(error.response.data.error_msg || error.response.data.data.error_msg);
        return;

    }
}