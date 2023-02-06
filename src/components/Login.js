import React, { useState, useEffect } from 'react';
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
      <Link color="inherit" href="https://localhost:3000/login">
        Twidler
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({setCurrentUser, userData}) {
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const history = useHistory()

  function handleUser(e) {
    setUsername(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }


  function handleSubmit(event) {
    event.preventDefault();

    const userFilter = userData.filter((i) => {
      const users = i.username == username && i.password == password
      return users
    })

    if (userFilter == false) {
      setCurrentUser([])
      setError(true)
    } else {
      setCurrentUser(userFilter)
      history.push("/home")
      setError(false)
    }

  };

  const erroring = <div>
    <TextField
      margin="normal"
      required
      fullWidth
      error
      id="outlined-error"
      // label="Error"
      label="Username"
      defaultValue="username"
      autoFocus
      onChange={handleUser}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      error
      id="outlined-error-helper-text"
      // label="Error"
      label="Password"
      defaultValue="password"
      type="password"
      helperText="Incorrect entry."
      autoFocus
      onChange={handlePassword}
    />
  </div>

  const nonError = <div>
    <TextField
      margin="normal"
      required
      fullWidth
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      autoFocus
      onChange={handleUser}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={handlePassword}
    />
  </div>

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error ? erroring : nonError}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item>
              <Link href="/login/new-user" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
