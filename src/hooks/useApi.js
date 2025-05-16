import { useState } from 'react';
import api from '../services/api';

export function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiCall = async (url, method = 'GET', data = null) => {
        setLoading(true);
        setError(null);

        try {
            console.log(`Calling ${method} ${url} with data:`, data);
            const response = await api({
                url,
                method,
                data,
            });
            console.log(`Response from ${url}:`, response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            console.error(`Error in ${url}:`, err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { apiCall, loading, error };
}