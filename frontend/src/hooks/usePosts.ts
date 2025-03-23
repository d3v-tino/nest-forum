import { useCallback, useEffect, useState } from "react";
import { Post } from "../models/Post";
import { getAllPosts, getPostById, getPostsByAuthor } from "../api/models/post";

type UsePostsParams = {
    postId?: string;
    authorId?: string;
};

export const usePosts = ({ postId, authorId }: UsePostsParams = {}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    
    const loadPosts = async () => {
      setLoading(true);
      try {
        let response;
        if (postId) {
          response = await getPostById(postId);
          setPosts([response.post]);
        } else if (authorId) {
          response = await getPostsByAuthor(authorId);
          setPosts(response.posts);
        } else {
          response = await getAllPosts();
          setPosts(response.posts);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        loadPosts();
    }, [postId, authorId, loadPosts]);

    return { posts, loading };
};
