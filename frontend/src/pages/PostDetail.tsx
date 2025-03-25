import React, { useCallback, useEffect, useState } from "react";
import { CardContent, Container, Typography, Card, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Post } from "../models/Post";
import { getPosts } from "../api/models/post";
import { LikeButton } from "../components/LikeButton";

export const PostDetail = () => {
    const { postId } = useParams();
    const { token } = useAuth();

    const [post, setPost] = useState<Post | null>(null);
    const safeToken = typeof token === "string" && token.trim() ? token : undefined;

    const reloadPost = useCallback(async () => {
        if (!postId) return;
    
        try {
          const res = await getPosts({
            query: { postId },
            token: safeToken,
          });
          setPost(res.posts?.[0] ?? null);
        } catch (error) {
          console.error("Error loading post:", error);
        }
      }, [postId, safeToken]);
    
      useEffect(() => {
        reloadPost();
      }, [reloadPost]);
    
    return(
        <Container maxWidth="md" sx={{ mt: 4 }}>
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <Stack mx={10} my={4}>
                        <Typography variant="h4" >{post?.title}</Typography>
                        <Typography variant="body2" >Posted by: {post?.author?.username}</Typography>
                        <Typography variant="body2" mt={2}>{post?.content}</Typography>
                            {post && (
                            <LikeButton
                            post={post}
                            readonly={false}
                            onLikeToggled={reloadPost}
                            />)}
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
};