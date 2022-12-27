import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Box, Stack, AppBar, Toolbar, IconButton, Button, Typography, TextField, Autocomplete } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
// import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
   lg: 600,
   xs: 400,
  },
 
  border: '0.5px solid #4AEFA0',
  borderRadius:'3px',
  color:'#000',
  background:'#f0f0f0',
  boxShadow: 24,
  p: 4,
};

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const darkTheme = createTheme({
  palette: {

    primary: {
      main: '#037440',
    },
  },
});
// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Button variant='outlined' sx={{mr:4}} onClick={handleOpen} >Create Properties</Button>
                    {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>

    <Modal
                  open={open}
               
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box sx={{width:'100%', borderBottom:'0.5px solid #fff', display:'flex', justifyContent:'right', mb:2}}>
                    <Button onClick={handleClose}>
                    {/* <CloseIcon sx={{color:'#ffff'}} */}
                    CLOSE
                    </Button>
                    </Box>
                   
                    <Typography id="modal-modal-title"  variant="h6" component="h2">
                      Create your new property
                    </Typography>
                    <Typography variant='caption' id="modal-modal-description">
                      please fill in all forms
                    </Typography>
                    <Box sx={{mt:4}}>
                      <TextField
                      helperText="Please type in a title or name of your property"
                      size="small"
                      type="text"
                      label="Preferred Property Name"
                      fullWidth
                      margin='normal'
                      />
                        <TextField
                        // ref={autoCompleteRef}
                        // onChange={event => setQuery(event.target.value)}
                        autoComplete="off"
                      helperText="Number of property units"
                      size="small"
                      type="text"
                      label="Address"
                      fullWidth
                      margin='normal'
                      />
                     <Autocomplete
                     size='small'
      disablePortal
      id="combo-box-demo"
      fullWidth
      options={top100Films}
      mb={2}
      sx={{ width: 300 , mb:3}}
      renderInput={(params) => <TextField {...params} label="City" />}
    />
                     <Autocomplete
                     size='small'
      disablePortal
      id="combo-box-demo"
      fullWidth
      margin="normal"
      options={top100Films}
      sx={{ width: 300 ,}}
      renderInput={(params) => <TextField {...params} label="State" />}
    />
                   
                      <TextField
                 
                      size="small"
                      type="text"
                      label="Zip Code"
                      
                      margin='normal'
                      />
                      <TextField
                      helperText="Number of property units"
                      size="small"
                      type="number"
                      label="No. of Unit"
                      fullWidth
                      margin='normal'
                      />
                      <Box sx={{display:'flex', justifyContent:'right'}}>
                        <Button variant='contained' >Create</Button>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
    </ThemeProvider>
  );
}


const top100Films = [
  { label: 'Alabama', year: 1994 },
  { label: 'Alaska', year: 1972 },
  { label: 'Arizona', year: 1974 },
  { label: 'Arkansas', year: 2008 },
  { label: 'California', year: 1957 },
  { label: "Colorado", year: 1993 },
  { label: 'Connecticut', year: 1994 },
  {
    label: 'Delaware',
    year: 2003,
  },
  { label: 'Florida', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'Georgia',
    year: 2001,
  },
  {
    label: 'Hawaii',
    year: 1980,
  },
  { label: 'Idaho', year: 1994 },
  { label: 'Illinios', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];