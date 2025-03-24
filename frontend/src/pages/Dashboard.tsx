import React from "react";
import { Box, Typography, Stack, Link, CardContent, Card } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { Post } from "../models/Post";
import { LikeButton } from "../components/LikeButton";

export const Dashboard = () => {
    const { user, isLoggedIn, token } = useAuth();
    const safeToken = typeof token === "string" && token.trim() ? token : undefined;

    const [posts, reloadPosts] = usePosts({
      token: isLoggedIn ? safeToken : undefined,
    });
    const navigate = useNavigate();

    console.log(posts);

    return(
        <Box p={3} maxWidth="50%" alignItems="center">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="h6" gutterBottom>Welcome {user?.username}</Typography>
            <Stack spacing={2}>
            {posts.map((post) => (
                    <Card key={post?.id}>
                    <CardContent>
                      <Stack spacing={1} mx={6}>
                        <Link
                          onClick={() => navigate(`/post/${post.id}`)}
                          variant="h6"
                          underline="hover"
                          sx={{ cursor: 'pointer' }}
                        >
                          {post.title}
                        </Link>
                  
                        <Typography variant="caption" color="text.secondary">
                          Posted by: {post.author?.username}
                        </Typography>
                  
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                          {post.content}...
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <LikeButton
                            key={post.id + String(post.likedByCurrentUser)}
                            post={post}
                            onLikeToggled={reloadPosts}
                            readonly={false}
                            />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
            </Stack>
        </Box>
    );
};