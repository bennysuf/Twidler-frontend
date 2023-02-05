import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CreatePost() {
  return (
    <Box>

    <div>
    {/* <TextField
      id="outlined-multiline-flexible"
      label="Multiline"
      multiline
      maxRows={4}
      />
    <TextField
      id="outlined-textarea"
      label="Multiline Placeholder"
      placeholder="Placeholder"
      multiline
      /> */}
    <TextField
      id="outlined-multiline-static"
      label="Multiline"
      multiline
      rows={4}
      defaultValue="Default Value"
      />
  </div>
      </Box>
    // <h1>hello creation</h1>
  )
}
