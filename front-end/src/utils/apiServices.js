import store from '../store/store.js';
import { logout } from '../store/user/userSlice';

export const handleApiCall = async (endpoint, options = {}) => {
    try {
        const res = await fetch(endpoint, options);
        if (res.status === 401) {
            store.dispatch(logout());
            window.location.href = '/login';
            return
        }

        return res;
    } catch (error) {
        console.log('Error in handleApiCall:', error);
    }
};