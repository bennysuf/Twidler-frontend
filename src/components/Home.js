import React, { useState, useEffect } from 'react'
import { Route, useHistory } from "react-router-dom"
import PostCards from "./PostCards"
import CreatePost from "./CreatePost"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function Home({ currentUser }) {
    const [posts, setPosts] = useState([])
    // const [reload, setReload] = useState("")

    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:9292/home")
            .then(r => r.json())
            .then(d => setPosts(d))
    }, [])

    function handleCLick() {
        history.push("/home/add-post")
    }


    const cards = posts.map(post => <PostCards key={post.id} post={post} />)

    return (
        <>
            <h1 style={{ textAlign: "center" }} >Welcome {currentUser.username}</h1>
            <div style={{ textAlign: "center", marginLeft: "100px", position: "absolute" }}>
                <Stack direction="row" spacing={1} onClick={handleCLick}>
                    <Chip label="New post" color="primary" />
                </Stack>
                <br />
                <Route path="/home/add-post" component={CreatePost} />
            </div>
            <ul>
                {cards}
            </ul>
        </>
    )
}

