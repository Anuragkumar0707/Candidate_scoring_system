import { AxiosError } from "axios";
import api from "./api";

export const evaluateResume = async (email: string): Promise<any> => {
    try {
        // Construct the endpoint URL
        const endpoint = `/evaluate-resume/${encodeURIComponent(email)}`;

        // Make the GET request to the Flask endpoint
        const response = await api.get(endpoint);

        // Log response data
        console.log("Resume Evaluation Response:", response.data);
        console.log("ATS Score:", response.data.ats_score);

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && (error.response.status === 404 || error.response.status === 500)) {
                console.error("Error occurred:", error.response.data.message || error.response.status);
            } else {
                console.error("Request failed with status:", error.response?.status || "Unknown status");
            }
        } else {
            console.error("Network or unknown error:", error);
        }

        // Return null on failure
        return null;
    }
};
