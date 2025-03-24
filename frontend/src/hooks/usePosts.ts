import { useEffect, useState } from "react";
import { Post } from "../models/Post";
import { getPosts } from "../api/models/post";

export const usePosts = ({ query, token }:{ query?: Record<string, string>, token?: string }): [Post[], () => void] => {
  const [posts, setPosts] = useState<Post[]>([]);

  const reloadPosts = () => {
    setPosts([]);
    getPosts({ query: query, token: token })
    .then(res => setPosts(res.posts));
  };

  useEffect(() => {
    reloadPosts();
  }, [query, token]);

  return [posts, reloadPosts];
};