import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CreatePost() {
    return (
        <Box>
            <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
            />
        </Box>
        // <h1>hello creation</h1>
    )
}

/*
TODO

post new post via fetch when onSubmit clicked

*/
