import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach Bearer token if available
API.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 500) {
                console.error("Internal Server Error: ", error.response.data);
                alert("Something went wrong. Please try again later.");
            }
        } else {
            console.error("Network Error: ", error.message);
            alert("Network error. Please check your connection.");
        }
        return Promise.reject(error instanceof Error ? error : new Error(error));
    }
);

export default API;
