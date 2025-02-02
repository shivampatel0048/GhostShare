import API from "@/utils/api";

export const shortenUrl = async (originalUrl: string) => {
    try {
        const response = await API.post("/shorten", { originalUrl });
        return response.data;
    } catch (error) {
        console.error("Error shortening URL:", error);
        throw new Error("Failed to shorten URL. Please try again.");
    }
};

export const getOriginalUrl = async (shortUrl: string) => {
    try {
        const response = await API.get(`/${shortUrl}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching original URL:", error);
        throw new Error("Short URL not found or server error.");
    }
};

export const getVisitCount = async (shortUrl: string) => {
    try {
        const response = await API.get(`/${shortUrl}/visits`);
        return response.data;
    } catch (error) {
        console.error("Error fetching visit count:", error);
        throw new Error("Failed to get visit count. Please try again.");
    }
};