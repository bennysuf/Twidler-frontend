import React, { useState, useEffect } from 'react'
import { Route, useHistory } from "react-router-dom"
import PostCards from "./PostCards"
import CreatePost from "./CreatePost"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function Home({ currentUser }) {
    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState("")
 
    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:9292/home")
            .then(r => r.json())
            .then(d => setPosts(d))
    }, [reload])

    function handleCLick(){
        history.push("/home/add-post")
    }


    const cards = posts.map(post => <PostCards key={post.id} post={post} />)

    return (
        <div>
            <h1 >Home page</h1>
            <Stack direction="row" spacing={1} onClick={handleCLick}>
                <Chip label="New post" color="primary" />
            </Stack>
            <br />
            <Route path="/home/add-post" component={CreatePost} />
            <ul> 
                {cards}
            </ul>
            {/* CSS to keep the cards from dropping down */}
        </div>
    )
}

//add username name to top of page
// create post, in nested route

/*
TODO
 
1. figure out hpw tp do nested routes
2. fix current user issue
*/

