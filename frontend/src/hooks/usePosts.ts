import { useEffect, useState } from "react";
import { Post } from "../models/Post";
import { getPosts } from "../api/models/post";

export const usePosts = ({ query, token }:{ query?: Record<string, string>, token?: string }): [Post[]] => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const reloadPosts = () => {
      setPosts([]);
      getPosts({ query: query, token: token })
      .then(res => setPosts(res.posts));
    };
    
    reloadPosts();
  }, [query, token]);

  return [posts];
};