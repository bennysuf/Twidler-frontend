import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function CreatePost({ currentUser, setReload }) {
    const [newPost, setNewPost] = useState("")
    const history = useHistory()

    function handleChange(e) {
        setNewPost(e.target.value)
    }

    function handleSubmit(e) {
        setReload("reload")

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
            .then(d => {
                setReload("")
                history.push("/home")
                setNewPost("")
            })
    }

    return (
        <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={3}
                onChange={handleChange}
            />
            <Stack direction="row-reverse" spacing={1} >
                <Button type='submit' variant="contained" endIcon={<SendIcon />} >
                    Send
                </Button>
            </Stack>
        </form>
    )
}

/*
TODO

move button down a drop

*/
