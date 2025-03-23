import { useEffect, useState } from "react";
import { Post } from "../models/Post";
import { getallposts } from "../api/models/post";

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = async () => {
        try {
            const response = await getallposts();
            setPosts(response.posts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return { posts };
};
