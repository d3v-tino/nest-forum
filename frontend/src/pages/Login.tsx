import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, Typography } from "@mui/material";
import { NestCard } from "../components/Card";
import { signup } from "../api/models/auth";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        //login method
    }
    
    return(
        <NestCard>
            <Typography variant="h4" align="center" fontWeight="bold">Sign in</Typography>
                <TextField value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField value={password} label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <Typography variant="body2" align="center">
                Dont have an account?{" "}
                    <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        navigate('/register')
                      }}
                    >
                    Sign up here
                    </Link>
                </Typography>
        </NestCard>
    )
}