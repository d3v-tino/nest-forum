import { useEffect, useState } from "react";
import { Post } from "../models/Post";
import { getAllPosts, getPostById, getPostsByAuthor } from "../api/models/post";

type UsePostsParams = {
    postId?: string;
    authorId?: string;
};

export const usePosts = ({ postId, authorId }: UsePostsParams = {}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const loadPosts = () => {
      let loader = postId
      ? getPostById(postId).then(res => setPosts([res.post]))
      : authorId
      ? getPostsByAuthor(authorId).then(res => setPosts(res.posts))
      : getAllPosts().then(res => setPosts(res.posts));

      loader.finally(() => setLoading(false));
    };

    useEffect(() => {
      loadPosts();
    }, [postId, authorId, loadPosts]);

    return { posts, loading };
};
