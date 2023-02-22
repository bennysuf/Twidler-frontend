import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Edit from "./Edit";
import AddUser from "./AddUser";
import CreatePost from "./CreatePost";
import UsersPosts from "./UsersPosts";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';

function App() {
  const [currentUser, setCurrentUser] = useState({ username: "Loading.." }) //user logged in
  const [userData, setUserData] = useState([]) //all users
  const [reload, setReload] = useState("")

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const history = useHistory()

  useEffect(() => { // pulls current user and adds it to state
    fetch("http://localhost:9292/current-user")
      .then(r => r.json())
      .then(d => {
        if (d[0] === undefined) {
          setCurrentUser({ username: "Loading.." })
        } else {
          setCurrentUser(d[0])
        }
      })
  }, [reload])

  useEffect(() => { // pulls all users 
    fetch("http://localhost:9292/login")
      .then(r => r.json())
      .then(d => setUserData(d))
  }, [])

  function userUpdate(user) { // updates user thats logged in
    fetch(`http://localhost:9292/current-user/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          user_id: user.id
        }
      ),
    })
      .then(r => r.json())
      .then(d => setReload(d))
  }


  function handleLogout() {
    fetch("http://localhost:9292/current-user", {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(() => {
        history.push("/login")
        setCurrentUser({ username: "Loading.." })
      })
  }

  const appBar = <AppBar position="fixed">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          TWIDLER
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title="Home">
            <Link to="/home">
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <HomeRoundedIcon />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Profile">
            <Link to="/profile">
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <AccountBoxRoundedIcon />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Add post">
            <Link to="/add-post">
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <PostAddIcon />
              </Button>
            </Link>
          </Tooltip>
        </Box>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 75,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Welcome {currentUser.username}
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={currentUser.username} src={currentUser.username} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
            <MenuItem onClick={() => history.push("/edit-user")} >
              <Typography textAlign="center">Edit Account</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login setCurrentUser={setCurrentUser} userData={userData} userUpdate={userUpdate} />
        </Route>
        <Route exact path="/new-user">
          <AddUser setCurrentUser={setCurrentUser} userData={userData} userUpdate={userUpdate} />
        </Route>
        <Route path="/home">
          <Home currentUser={currentUser} handleLogout={handleLogout} appBar={appBar} />
        </Route>
        <Route path="/profile">
          <UsersPosts currentUser={currentUser} handleLogout={handleLogout} appBar={appBar} />
        </Route>
        <Route exact path="/add-post">
          <CreatePost currentUser={currentUser} appBar={appBar} />
        </Route>
        <Route path="/edit-user">
          <Edit appBar={appBar} currentUser={currentUser} userUpdate={userUpdate} handleLogout={handleLogout} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

/* 
? how to get page to work if wrong entry in Login?
*/
