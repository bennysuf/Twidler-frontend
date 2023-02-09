import React, { useState, useEffect } from 'react'
import { Route, useHistory } from "react-router-dom"
import PostCards from "./PostCards"
import CreatePost from "./CreatePost"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NavBar from "./NavBar";


export default function Home({ currentUser, handleLogout }) {
    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState("")

    const history = useHistory()

    useEffect(() => { // pulls all posts
        fetch("http://localhost:9292/home")
            .then(r => r.json())
            .then(d => setPosts(d))
    }, [reload])

    function handleCLick() {
        history.push("/home/add-post")
    }

    const cards = posts.map(post => <PostCards key={post.id} post={post} />)

    return (
        <>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
            <NavBar />
            <h1 style={{ textAlign: "center" }} >Welcome {currentUser.username}</h1>
            <div style={{ textAlign: "center", marginLeft: "100px", position: "absolute" }}>
                <Stack direction="row" spacing={1} onClick={handleCLick}>
                    <Chip label="New post" color="primary" />
                </Stack>
                <br />
                <Route path="/home/add-post">
                    <CreatePost currentUser={currentUser} setReload={setReload} />
                </Route>
            </div>
            <ul>
                {cards}
            </ul>
        </>
    )
}

