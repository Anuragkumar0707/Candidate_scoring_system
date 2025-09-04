import axios from 'axios';

// const BASE_URL =  "http://127.0.0.1:5000"
const BASE_URL =  "https://candidate-review.onrender.com"

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
