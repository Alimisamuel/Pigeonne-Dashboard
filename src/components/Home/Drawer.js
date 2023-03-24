import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Button,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../Img/logo-black.png';

const Drawers = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'black',
              paddingLeft: '40px',
            }}
            exact
            activeclassname="active"
          >
            <Link to="/">
              <img src={Logo} alt="Logo" width={80}   style={{margin:'20px'}}/>
            </Link>
            <Container
              maxWidth="true"
              sx={{
                height: '5px',
                bgcolor: '#037440',
              }}
            >
              {' '}
            </Container>
            <Container
              maxWidth="true"
              sx={{
                height: '10px',
                bgcolor: '#4aefa0',
              }}
            >
              {' '}
            </Container>
            <Container
              maxWidth="true"
              sx={{
                height: '15px',
                bgcolor: '#d6e6df#d6e6d',
              }}
            >
              {' '}
            </Container>
            <ListItemButton sx={{ padding: '3px 20px', mt: 6 }}>
              <ListItemIcon>
                <ListItemText sx={{ fontFamily: 'pangram', fontWeight: 'bolder', color: '#000' }}>ABOUT</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </Link>
          <Divider sx={{ mt: 5 }} />
          <div style={{ paddingLeft: '20px' }}>
            <a
              href="tel:+12146999967"
              style={{ color: '#000', fontFamily: 'pangram', fontSize: '11px', marginRight: '30px' }}
            >
              Contact: +1 (214) 669-9967
            </a>
            <br />{' '}
            <a
              href="mailto:business@pigeonne.app"
              style={{ color: '#000', fontFamily: 'pangram', fontSize: '11px', marginRight: '30px' }}
            >
              Email: business@pigeonne.app
            </a>
          </div>

          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              color: 'black',
              textAlign: 'left',
            }}
            exact
            activeclassname="active"
          >
            <Button
              variant="outlined"
              sx={{
                mt: 5,
                ml: 2,
                mr: 3.5,
                px: 4,
                color: '#000',
                borderRadius: '0px',
                border: '1px solid #000',
              }}
            >
              Login
            </Button>
          </Link>
        </List>
      </Drawer>
      <IconButton sx={{ color: '#000', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawers;
