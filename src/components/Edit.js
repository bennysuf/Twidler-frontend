import React, { useState } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


export default function Edit({ appBar, currentUser }) {
    const [userUpdate, setUserUpdate] = useState("")

    function handleChange(e){
        setUserUpdate(e.target.value)
    }

    function handleUpdate(e) {
        e.preventDefault()

        fetch(`http://localhost:9292/edit-user/${currentUser.user_id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                id: currentUser.user_id,
                username: userUpdate
              }
            ),
          })
            .then(r => r.json())
            //needs to update current user as well
            //App has fetch, find what it on line 59
    }
        
        
        //fetch PATCH
    
    
    function handleDelete(){
        // fetch(`http://localhost:9292/edit-user/currentUser.user_id`)
        //fetch delete
    }

    return (
        <>
            {appBar}
            <div style={{ textAlign: "center", margin: "200px" }}>
                <form onSubmit={handleUpdate}>
                    <TextField id="outlined-basic" label="New username" variant="outlined" onChange={handleChange}/>
                    <br />
                    <Button variant="contained" color="success" type='submit' style={{ margin: "15px" }}>
                        Update Username
                    </Button>
                </form>
            </div>
            {/* //TODO move button  */}
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} style={{textAlign: "center", marginBottom: "10px" }}>
                    Delete Account
                </Button>
        </>
    )
}

// Delete button has onclick which deletes account, triggers reload on all useEffects

//text box, onSubmit, onChange

//two fetches, PATCH, DELETE, `http://localhost:9292/edit-user/currentUser.user_id`

//send down current user to get user_id