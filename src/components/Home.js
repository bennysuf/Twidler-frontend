import React, { useState, useEffect } from 'react'
import { Route, useHistory } from "react-router-dom"
import PostCards from "./PostCards"
import CreatePost from "./CreatePost"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NavBar from "./NavBar";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';

//!
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
//!


export default function Home({ currentUser, handleLogout }) {
    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState("")

    const history = useHistory()

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    //!

    useEffect(() => { // pulls all posts
        fetch("http://localhost:9292/home")
            .then(r => r.json())
            .then(d => setPosts(d))
    }, [reload])

    function handleCLick() { // ? is this the best way to change routes?
        history.push("/home/add-post")
    }

    const cards = posts.map(post => <PostCards key={post.id} post={post} />)

    //!    
    return (
        <>
            <AppBar position="fixed">
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
                        {/* //TODO change to center */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title="Home">
                                <Button
                                    // TODO onClick
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <HomeRoundedIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Account">
                                <Button
                                    // TODO onClick
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <AccountBoxRoundedIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="new Post">
                                <Button
                                    onClick={handleCLick}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <PostAddIcon />
                                </Button>
                            </Tooltip>
                        </Box>

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
                                <MenuItem >
                                    <Typography textAlign="center">Edit Account</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ul style={{ marginTop: "80px" }}>
                {cards}
            </ul>
            <Route path="/home/add-post">
                <CreatePost currentUser={currentUser} setReload={setReload} />
            </Route>
        </>
    );
    //!

    // return (
    //     <>
    //         <Button variant="contained" onClick={handleLogout}>Logout</Button>
    //         <NavBar />
    //         <h1 style={{ textAlign: "center" }} >Welcome {currentUser.username}</h1>
    //         <div style={{ textAlign: "center", marginLeft: "100px", position: "absolute" }}>
    //             <Stack direction="row" spacing={1} onClick={handleCLick}> {/* //? < best way to change routes? */}
    //                 <Chip label="New post" color="primary" />
    //             </Stack>
    //             <br />
    //         </div>
    //     </>
    // )
}




