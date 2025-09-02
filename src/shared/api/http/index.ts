import { storage } from "@/shared/util/storage";
import axios from "axios";


export const BASE_URL = "https://api996.syntlex.kg/api";

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

const getToken = async (): Promise<string | null> => {
    try {
        const userString = await storage.get('user');
        if (!userString) return null;
        const user = JSON.parse(userString);
        return user?.token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

$api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            console.error('Error in request interceptor:', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default $api;