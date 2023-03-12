import React, { useState } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';


export default function Edit({ appBar, currentUser, userUpdate, handleLogout }) {
    const [newUser, setNewUser] = useState("")

    function handleChange(e) {
        setNewUser(e.target.value)
    }

    function handleUpdate(e) {

        e.preventDefault()

        fetch(`http://localhost:9292/edit-user/${currentUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    id: currentUser.user_id,
                    username: newUser
                }
            ),
        })
            .then(r => r.json())
            .then(d => userUpdate(d))
    }


    function handleDelete() {
        fetch(`http://localhost:9292/edit-user/${currentUser.id}`, {
            method: "DELETE"
        })
            .then(r => r.json())
            .then(() => handleLogout())
    }

    return (
        <>
            {appBar}
            <div style={{ textAlign: "center", margin: "200px" }}>
                <form onSubmit={handleUpdate}>
                    <TextField id="outlined-basic" label="New username" variant="outlined" onChange={handleChange} />
                    <br />
                    <Button variant="contained" color="success" type='submit' style={{ margin: "15px" }}>
                        Update Username
                    </Button>
                </form>
            </div>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} style={{ textAlign: "center", marginBottom: "10px" }}
                onClick={handleDelete}>
                Delete Account
            </Button>
        </>
    )
}
