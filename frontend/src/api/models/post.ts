import { api } from "../apiClient";
import { API_ENDPOINTS } from "../endpoints";

export const createpost = async ({ title, content }:{ title: string, content: string }, token: string) => {
    return await api.post(API_ENDPOINTS.POSTS, { title, content }, { Authorization: `Bearer ${token}` });
};

export const getAllPosts = async () => api.get(API_ENDPOINTS.POSTS);

export const getPostById = async (postId: string) => {
    return await api.get(`${API_ENDPOINTS.POSTS}/${postId}`);
};

export const getPostsByAuthor = async (authorId: string) => {
    return await api.get(`${API_ENDPOINTS.POSTS}/author/${authorId}`);
};
