import * as React from 'react';
import Box from '@mui/material/Box';

export default function Box1() {
  return (
    <Box
      sx={{
        borderRadius: '45px',
        height: 600,
        marginLeft: 7,
        marginRight: 7, 
        display: 'flex',
        backgroundColor: '#f7e9ec',
        //'&:hover': {
          //backgroundColor: 'pink',
          //opacity: [0.9, 0.8, 0.7],
        //},
      }}
    />
  );
}