import { AxiosError } from "axios";
import api from "./api";

export const sendOTP = async (email: string): Promise<any> => {
    try {
        const endpoint = `/send-otp/${encodeURIComponent(email)}`;
        const response = await api.get(endpoint);

        console.log("OTP Response:", response.data);
        
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data returned from server.");
            return null;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.error("Bad Request:", error.response.data.message || error.response.status);
                } else if (error.response.status === 500) {
                    console.error("Server Error:", error.response.data.message || error.response.status);
                } else {
                    console.error("Error occurred with status:", error.response.status);
                }
            }
        } else {
            console.error("Network or unknown error:", error);
        }
    
        return null;
    }
};

export const verifyOTP = async (email: string, otp: string): Promise<any> => {
    try {
        const data = { email, otp };
        
        const endpoint = `/verify-otp`;
        const response = await api.post(endpoint, data);

        console.log("Match Response:", response.data);

        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data returned from server.");
            return null;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.error("Bad Request:", error.response.data.message || error.response.status);
                } else if (error.response.status === 500) {
                    console.error("Server Error:", error.response.data.message || error.response.status);
                } else {
                    console.error("Error occurred with status:", error.response.status);
                }
            }
        } else {
            console.error("Network or unknown error:", error);
        }

        return null;
    }
};
