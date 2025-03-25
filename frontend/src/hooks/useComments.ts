import { useEffect, useState } from "react";
import { getPostComments } from "../api/models/post";
import { Comment } from "../models/Comment";

export const useComments = ({ postId }:{ postId: string }): [Comment[]] => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const reloadComments = () => {
      setComments([]);
      getPostComments(postId)
      .then(res => setComments(res.comments));
    };
    
    reloadComments();
  }, [postId]);

  return [comments];
};