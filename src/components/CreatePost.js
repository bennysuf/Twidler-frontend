import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function CreatePost({ currentUser, appBar, setPosts, posts }) {
    const [newPost, setNewPost] = useState("")
    const history = useHistory()

    function handleChange(e) {
        setNewPost(e.target.value)
    }

    function handleSubmit(e) {

        e.preventDefault();

        fetch("http://localhost:9292/posts", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    user_id: currentUser.user_id,
                    body: newPost
                }
            ),
        })
            .then(r => r.json())
            .then((newPost) => {
                setPosts([newPost, ...posts])
                history.push("/home")
                setNewPost("")
            })
    }

    return (
        <>
            {appBar}
            <form style={{ textAlign: "center", margin: "200px" }} onSubmit={handleSubmit}>
                <TextField
                    id="outlined-multiline-static"
                    label="New post"
                    multiline
                    rows={3}
                    onChange={handleChange}
                />
                <br />
                <Button type='submit' variant="contained" endIcon={<SendIcon />} style={{ margin: "10px" }}>
                    Send
                </Button>
            </form>
        </>
    )
}

