import React, { useState, useEffect } from 'react'
import { Route } from "react-router-dom"
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

    function handleDelete(e) { //doesnt rerender page
        fetch(`http://localhost:9292/posts/delete/${e.id}`, {
            method: "DELETE"
        })
            .then(r => r.json())
            .then(d => setReload(""))

        console.log("click", e.id)
    }

    const cards = posts.map(post => <PostCards key={post.id} post={post} handleDelete={handleDelete} />)

    return (
        <div>
            <CreatePost />
            {/* <h3>hello {currentUser}</h3> cant render currentUser, reloads and becomes empty array*/}
            <ul>
                {cards}
            </ul>
        </div>
    )
}

//add username name to top of page
// create post

//posts have body, created at, updated at. 