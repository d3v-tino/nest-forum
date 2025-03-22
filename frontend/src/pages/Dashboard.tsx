import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
    const { user } = useAuth();

    return(
        <Box p={3} maxWidth="50%" alignItems="center">
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography variant="h6" gutterBottom>Welcome {user?.username}</Typography>
        </Box>
    );
};