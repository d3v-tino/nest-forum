import React from "react";
import { Box, Typography, Stack, Link, CardContent, Card } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { user } = useAuth();
    const { posts } = usePosts();
    const navigate = useNavigate();

    return(
        <Box p={3} maxWidth="50%" alignItems="center">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="h6" gutterBottom>Welcome {user?.username}</Typography>
            <Stack spacing={2}>
                {posts.map((post) => (
                    <Card key={post?.id}>
                        <CardContent>
                            <Link 
                            onClick={() => navigate(`/post/${post.id}`)}
                            variant="h6"
                            >
                                {post.title}
                            </Link>
                            <Typography variant="body2">Posted by: {post.author?.username}</Typography>
                            <Typography variant="body2">{post.content}...</Typography>
                            <Typography variant="body2">{post.likes_count}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};