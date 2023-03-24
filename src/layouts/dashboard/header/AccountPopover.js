import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton, Popover, Skeleton } from '@mui/material';
// mocks_

import { useLogout } from '../../../hooks/useLogout'


import { useAuthContext } from '../../../hooks/useAuthContext';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [

  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },

];

// ----------------------------------------------------------------------

export default function AccountPopover() {


  const [open, setOpen] = useState(null);
  const user = JSON.parse(window.localStorage.getItem('user'));
  const {logout} = useLogout()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
const handleCloseModal = () =>{
  setOpen(null);
}


  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar >
        { user === null?
            <Skeleton variant="circular" width={40} height={40} />:
              user.displayName.charAt(0)} 
          </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseModal}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
              { user === null?
            <Skeleton variant="text"  />:
              user.displayName} 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>


          {user == null ?
           <Skeleton variant="rectangular" width={100} height={10} sx={{background:'#f0f0f0b3'}} />:
           user.email
           }
          </Typography>
        </Box>

   

      

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem  sx={{ m: 1 }} onClick={logout} >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
