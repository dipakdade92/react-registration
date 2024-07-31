import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleNodeApi = async () => {
    try {

        let config = {
            method: 'post',
            url: `${import.meta.env.VITE_NODE_BASE_URL}/get-message`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({})
        };
        const response = await axios.request(config);
        toast.success(response.data.msg);
        return;
    } catch (error) {
        toast.error(error.response.data.error);
        return;
    }
}