import { AxiosError } from "axios";
import api from "./api";

export const getUser = async (email: string) => {
    try {
        await api.get(`/getuser/${email}`)

        return false;
    } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.status === 404) {
            console.error("Error occurred:", error.response.data.error || error.response.status);
        } else {
            console.error("Network or unknown error:", error);
        }

        return true
    }
}

export const checkCreds = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append("email", email)
    formData.append("password", password)

    try {
        const response = await api.post('/check-creds', formData);
        
        console.log("User found: ", response.data);
        console.log(response.data.resume_url)
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response && (error.response.status === 403 || error.response.status === 404)) {
            console.error("Error occurred:", error.response.data.error || error.response.status);
        } else {
            console.error("Network or unknown error:", error);
        }

        return null;
    }
}

export const fetchUsers = () => api.get('/users');

export const createUser = async (userData: FormData) => {
    try {
        const response = await api.post('/signup', userData);
        
        console.log("User created successfully: ", response.data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.status === 500) {
                console.error("Error occurred:", error.response.data.error || error.response.status);
        } else {
            console.error("Network or unknown error:", error);
        }

        return null;
    }
}