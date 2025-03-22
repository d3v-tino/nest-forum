import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import { NestCard } from "../components/Card";
import { signup } from "../api/models/auth";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
          const result = await signup({ email, username, password });
      
          if (!result) {
            alert("Signup failed.");
            return; 
          }
      
          navigate("/dashboard");
        } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed. Please check your inputs.");
        }
      };

    return(
        <NestCard>
            <Typography variant="h4" align="center" fontWeight="bold">Sign up</Typography>
                <TextField value={username} label="Username" onChange={(e) => setUsername(e.target.value)} />
                <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleRegister}>Register</Button>
        </NestCard>
    );
}