import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Adjusted baseURL to include /api prefix for Laravel API routes
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Required for session-based authentication
});

api.interceptors.request.use(
    config => {
        console.log('Request config:', config);
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;