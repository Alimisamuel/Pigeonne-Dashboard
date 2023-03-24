import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material'

import Drawers from './Drawer'
import '../../pages/dashboard.css'
import Logo from '../../Img/logo-black.png'

const NewNav = () => {
  const [value, setValue] = useState()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);
  return (
    <>
      <AppBar className={color ? "appbar appbar-bg" : "appbar"} sx={{ background: '#f0f0f0' }}>
        <Toolbar sx={{ margin: '0 auto', width: '89%' }}>
          <Link to="/">
            <img src={Logo} alt="Logo" width={120} />
          </Link>
          {isMatch ? (
            <>
              <Typography> </Typography>
              <Drawers />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: 'auto', mr:3 }}
                value={value}
                onChange={(e, value) => setValue(value)}
             
                className="color"
              >
                <Tab label="About" sx={{color:'#000', fontWeight:'bolder', fontFamily:'pangram'}}/>

               
              </Tabs>
              <div  >

                <a href='tel:+12146999967' style={{color:'#000', fontFamily:'pangram', fontSize:'11px',  marginRight:'30px'}}>Contact: +1 (214) 669-9967</a>
               <br/> <a href='mailto:business@pigeonne.app' style={{color:'#000', fontFamily:'pangram', fontSize:'11px',  marginRight:'30px'}}>Email: business@pigeonne.app</a>
              </div>
              <Link
                to="/login"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Button
                  variant="outlined"
                  sx={{
                     px:4,
                     color:'#000',
                     borderRadius:'0px',
                     border:'1px solid #000'
                  }}
                >
                  Login
                </Button>
              </Link>
              {/* <Link to='/Donate' exact activeclassname='active'>    <button className="buttons">Donate</button></Link> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default NewNav
