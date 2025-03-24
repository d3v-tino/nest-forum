import React, { useState } from "react";
import { IconButton, Typography, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../context/AuthContext";
import { Post } from "../models/Post";

interface LikeButtonProps {
    post: Post;
    readonly?: boolean;
}
export const LikeButton = ({ post, readonly = true }: LikeButtonProps) => {
    const { likedByCurrentUser = false, likes_count } = post;
    const { isLoggedIn } = useAuth();

    return(
        <Stack direction="row" alignItems="center" spacing={0.5}>
        <IconButton disabled>
          {likedByCurrentUser ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{post.likes_count}</Typography>
      </Stack>
    )
}