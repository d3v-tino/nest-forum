import { api } from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const createpost = async ({ title, content }:{ title: string, content: string }, token: string) => {
    return await api.post(API_ENDPOINTS.POSTS, { title, content }, { Authorization: `Bearer ${token}` });
};

export const getallposts = async () => api.get(API_ENDPOINTS.POSTS);