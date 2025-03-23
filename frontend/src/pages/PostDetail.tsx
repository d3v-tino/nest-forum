import React from "react";
import { usePosts } from "../hooks/usePosts";
import { CardContent, Container, Typography, Card, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
    const { postId } = useParams();
    const { posts, loading } = usePosts({postId: postId});
    const post = posts[0];

    if (loading) return <div>Loading post...</div>;
    if (!post) return <div>Post not found.</div>;
    
    return(
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Stack spacing={2}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" >{post?.title}</Typography>
                        <Typography variant="body2" >Posted by: {post?.author?.username}</Typography>
                        <Typography variant="body2" >{post?.content}</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
};