import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import PostCards from "./PostCards"
import Button from '@mui/material/Button';
import NavBar from "./NavBar";
import { NavLink } from 'react-router-dom';
import Edit from "./Edit"

export default function UsersPosts({ currentUser, handleLogout }) {
    const [ownPosts, setOwnPosts] = useState([])

    useEffect(() => {
        console.log("currentUser", currentUser)
        fetch(`http://localhost:9292/posts/${currentUser.user_id}`)
            .then(r => r.json())
            .then(d => setOwnPosts(d))
    }, [])

    //TODO if ownPost is empty return "Such emptiness"
    //? How to make an if statement in a variable?
    //* Try map if post == null 
    //* something where ownPosts == null?
    //! map wont work, it will return string multiple times
    //* ternary where if cards == false? 
    const cards = ownPosts.map(post => <PostCards key={post.id} post={post} />)

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
                <NavBar />
                <NavLink
                    style={{ marginRight: "10px", font: "menu" }}
                    to="/profile/edit-user">
                    Edit Account
                </NavLink>
                <Route path="/profile/edit-user">
                    <Edit />
                </Route>
            </div>
            <ul>
                {cards}
            </ul>
        </>
    )
}
