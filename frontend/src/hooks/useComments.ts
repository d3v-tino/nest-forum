import { useEffect, useState } from "react";
import { getPostComments } from "../api/models/post";
import { Comment } from "../models/Comment";

export const useComments = (postId: string, token?: string): [Comment[]] => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const reloadComments = () => {
      setComments([]);
      getPostComments(postId, token)
      .then(res => setComments(res.comments));
    };
    
    reloadComments();
  }, [postId, token]);

  return [comments];
};