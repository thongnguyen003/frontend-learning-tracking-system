// hooks/useApi.js
import { useState } from 'react';
import axios from 'axios';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCall = async (url, method, data = null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url,
                method,
                data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err);
            throw err;
        }
    };

    return { apiCall, loading, error };
};