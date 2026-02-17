import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Adjust if your backend URL is different
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
