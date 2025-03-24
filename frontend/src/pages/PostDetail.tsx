import React from "react";
import { usePosts } from "../hooks/usePosts";
import { CardContent, Container, Typography, Card, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
    
    return(
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Stack spacing={2}>
                <Card>
                    <CardContent>
                        <Typography variant="h4">Hi</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
};