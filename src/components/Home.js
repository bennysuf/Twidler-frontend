import React, { useState, useEffect } from 'react'
import { Route, NavLink } from "react-router-dom"
import PostCards from "./PostCards"
import CreatePost from "./CreatePost"

export default function Home({ currentUser }) {
    const [posts, setPosts] = useState([])
    const [reload, setReload] = useState("")

    useEffect(() => {
        fetch("http://localhost:9292/home")
            .then(r => r.json())
            .then(d => setPosts(d))
    }, [reload])


    const cards = posts.map(post => <PostCards key={post.id} post={post} />)

    return (
        <div>
            <NavLink
                style={{ marginRight: "10px" }}
                to="/home/add-post">
                New post
            </NavLink>
            <Route exact path="/home/add-post">
                {/* created nested route */}
                <CreatePost />
            </Route>
            {/* <h3>hello {currentUser}</h3> cant render currentUser, reloads and becomes empty array*/}
            <ul>
                {cards}
            </ul>
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

