import { Box } from '@mui/material'
import React from 'react'

export default function Body(props) {
  return (
    <Box sx={{ display: 'flex', width: '100%', padding: '30px'}}>
      {props.children}
    </Box>
  )
}
 