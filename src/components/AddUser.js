import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/login">
                Twidler
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp({ setCurrentUser, userData, userUpdate }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [userError, setUserError] = useState(false)

    const history = useHistory()

    function handleUser(e) {
        setUsername(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const userFilter = userData.filter((i) => {
            return i.username === username
        })
        
        
        if (userFilter == false === false) { // checks if username exists
            setCurrentUser([])
            setError(true)
            setUserError(true)
        } else if (password.length === 0) { // checks if a password was put in
            setCurrentUser([])
            setError(true)
            setUserError(false)
        } else { // creates user 
            history.push("/home")
            fetch("http://localhost:9292/login/new-user", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        username: username,
                        password: password
                    }
                    ),
                })
                .then(r => r.json())
                .then(d => userUpdate(d))
                
                setError(false)
            }
            
            

    };



    const usernameError = <div>
        <TextField
            margin="normal"
            required
            fullWidth
            error
            id="outlined-error"
            label="Username"
            helperText={userError ? "Username taken." : ""} //ternary for password or user or both
            defaultValue={username}
            autoFocus
            onChange={handleUser}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            error
            id="outlined-error-helper-text"
            label="Password"
            defaultValue={password}
            type="password"
            helperText={userError ? "Incorrect entry." : "Please put in password"}
            autoFocus
            onChange={handlePassword}
        />
    </div>

    const nonError = <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleUser}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handlePassword}
            />
        </Grid>
    </Grid>

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {error ? usernameError : nonError}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
