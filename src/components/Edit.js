import React, {useState} from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


export default function Edit() {
    const [userUpdate, setUserUpdate] = useState("")

    // function handleChange(e){
    //     setUserUpdate(e.target.value)
    // }

    function handleUpdate(e) {
        e.preventDefault()



    }

    return (
        <Stack direction="row" spacing={2}>
            <form onSubmit={handleUpdate}>
                <br/>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <br/>
                <Button variant="contained" color="success" type='submit' >
                    Update
                </Button>
            </form>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                Delete Account
            </Button>
        </Stack>
    )
}

// Delete button has onclick which deletes account, triggers reload on all useEffects

//text box, onSubmit, onChange

//two fetches, PATCH, DELETE, `http://localhost:9292/edit-user/currentUser.user_id`

//send down current user to get user_id