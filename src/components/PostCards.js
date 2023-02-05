import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));


export default function AutoGridNoWrap({ post, handleDelete }) {
  const [user, setUser] = useState([])
  const [initial, setInitial] = useState([])
  const { body, created_at, user_id } = post

  useEffect(() => {
    fetch(`http://localhost:9292/user/${user_id}`)
      .then(r => r.json())
      .then(d => {
        setUser(d)
        setInitial(d.username.charAt(0))
      })
  }, [])


  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>{initial}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{body}</Typography>
            <h5>{created_at.slice(0, 10)}, {created_at.slice(11, 19)}</h5>
          </Grid>
          {/* <Stack direction="row" alignItems="center" spacing={1} onClick={() => handleDelete(post)}>
            <IconButton aria-label="delete" disabled color="primary"  >
              <DeleteIcon />
            </IconButton>
          </Stack> */}
        </Grid>
      </StyledPaper>
    </Box>
  );
}

//no edit button, delete only from self post page 