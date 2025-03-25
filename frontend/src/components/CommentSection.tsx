import React, { useEffect, useState } from "react";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { Typography, Stack, Paper, Divider, TextField, Button, Box } from "@mui/material";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../context/AuthContext";
import { createComment } from "../api/models/comment";
import { getPostComments } from "../api/models/post";

interface CommentSectionProps {
    post: Post;
}

export const CommentSection = ({ post }: CommentSectionProps) => {
    const { token, isLoggedIn } = useAuth();
    // const safeToken = typeof token === "string" && token.trim() ? token : undefined;

    
    const [comments] = useComments({ postId: post.id });
    const [postComments, setPostComments] = useState<Comment[]>([]);
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            if (typeof token === "string" && token.trim()) {
                await createComment({postId: post.id, content: content }, token);
                setContent('');
                const res = await getPostComments(post.id);
                setPostComments(res.comments ?? []);         
            } else {
                console.log('You need to be logged in to create a post');
                return;
            }

        } catch (error) {
            console.error('Error posting comment', error);
            alert('Failed to post commment. Please try again');
        }
    };

    useEffect(() => {
        if (comments.length > 0 && postComments.length === 0) {
        setPostComments(comments);
        }
    }, [comments, postComments]);

    return(
        <Stack spacing={2} mt={4}>
        <Typography variant="h6">Comments</Typography>
        <Box>
            {isLoggedIn ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                <TextField
                value={content}
                fullWidth
                size="small"
                placeholder="Write a comment..."
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                />
                <Button variant="contained" onClick={handleSubmit} disabled={!content.trim()}>Send</Button>
            </Stack>
            ): (
                <Stack>
                    <Typography>Log in to comment this post</Typography>
                </Stack>
            )}
        </Box>
        {comments.length > 0 ? (
            postComments.map((comment) => (
            <Paper
                key={comment.id}
                elevation={0}
                sx={{
                borderRadius: 2,
                p: 2,
                }}
            >
                <Stack spacing={1}>
                <Typography variant="subtitle2" color="text.secondary">
                    {comment.author.username}
                </Typography>
                <Typography variant="body1">{comment.content}</Typography>
                <Divider />
                <Typography variant="caption" color="text.disabled">
                    {new Date(comment.createdAt).toLocaleString()}
                </Typography>
                </Stack>
            </Paper>
            ))
        ) : (
            <Typography color="text.secondary">No comments yet.</Typography>
        )}
        </Stack>
    );
};