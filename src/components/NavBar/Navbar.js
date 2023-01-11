import { AppBar, Toolbar, styled, Typography } from '@mui/material'
import {Pets} from '@mui/icons-material'
import React from 'react'

const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent: "space-between"
})

const Navbar = () => {
  return (
    <>
        <AppBar position = "sticky">
            <StyledToolbar>
                <Typography variant = "h6" sx = {{ display: {xs: "none", sm: "block"}}}>
                    Mihir's Major Project    
                </Typography>
                <Pets sx = {{ display: {xs: "block", sm: "none"}}}/>
            </StyledToolbar>
            
        </AppBar>

    </>
  )
}

export default Navbar