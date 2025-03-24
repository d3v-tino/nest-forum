import React, { useState } from "react";
import { IconButton, Typography, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../context/AuthContext";
import { Post } from "../models/Post";
import { toggleLike } from "../api/models/like";
import { usePosts } from "../hooks/usePosts";

interface LikeButtonProps {
    post: Post;
    onLikeToggled?: () => void;
    readonly?: boolean;
}
export const LikeButton = ({ post, onLikeToggled, readonly = true }: LikeButtonProps) => {
    const { token, isLoggedIn } = useAuth();

    const handleToggleLike = async () => {
      if (!token || readonly || !isLoggedIn) return;
      try {
        await toggleLike(post.id, 'post', token);
        if (onLikeToggled) onLikeToggled();
      } catch (error) {
        
      }
    };

    return(
        <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton
          onClick={handleToggleLike}
          disabled={!isLoggedIn || readonly}
          size="small"
        >
          {post.likedByCurrentUser ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{post.likes_count}</Typography>
      </Stack>
    );
};