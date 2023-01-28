import { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// @mui
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { debounce } from '@mui/material/utils';
import CssBaseline from '@mui/material/CssBaseline';
import SaveIcon from '@mui/icons-material/Save';
// import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  TextField,
  Grid,
  Autocomplete,
  Alert,
} from '@mui/material';
import parse from 'autosuggest-highlight/parse';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import { useAuthContext } from '../../../hooks/useAuthContext';

import AccountPopover from './AccountPopover';
import { useFirestore } from '../../../hooks/useFirestore';

// ----------------------------------------------------------------------

const GOOGLE_MAPS_API_KEY = 'AIzaSyCoybA7QMl3eQP8of1wWW-FhUeYwrk0V1o';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
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
  borderRadius: '3px',
  color: '#000',
  background: '#f0f0f0',
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
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loaded = useRef(false);
  const { addDocument, response } = useFirestore('properties');
  const [propUnit, setPropUnit] = useState('');
  const [propName, setPropName] = useState('');
  const { user } = useAuthContext();

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleCreateProperty = (e) => {
    e.preventDefault();
    const address = value.description;
    addDocument({ uid: user.uid, propName, address, propUnit });
  };

  useEffect(() => {
    if (response.success) {
      setPropName('');
      setValue('');
      setPropUnit('');

      setTimeout(() => {
        response.success = false;
      }, 500);
    }
  }, [response.success]);

  // const NewSammy = value.terms.splice(-1)
  // console.log("Meeee",NewSammy)

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
            <Button variant="outlined" sx={{ mr: 4 }} onClick={handleOpen}>
              Create Properties
            </Button>
            {/* <LanguagePopover /> */}
            {/* <NotificationsPopover /> */}
            <AccountPopover />
          </Stack>
        </StyledToolbar>
      </StyledRoot>

      {/* /////////////////.................MODAL..............///////////////// */}

      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box
            sx={{ width: '100%', borderBottom: '0.5px solid #fff', display: 'flex', justifyContent: 'right', mb: 2 }}
          >
            <Button onClick={handleClose}>
              {/* <CloseIcon sx={{color:'#ffff'}} */}
              CLOSE
            </Button>
          </Box>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create your new property
          </Typography>
          <Typography variant="caption" id="modal-modal-description">
            please fill in all forms
          </Typography>
          <Box sx={{ mt: 4 }}>
            {response.success && <Alert severity="success">Apartment created successfully</Alert>}
            {response.error === true && <Alert severity="error">{response.error}</Alert>}
            <TextField
              required
              helperText="Please type in a title or name of your property"
              type="text"
              value={propName}
              onChange={(e) => setPropName(e.target.value)}
              label="Preferred Property Name"
              fullWidth
              margin="normal"
            />
            <Autocomplete
              required
              fullWidth
              id="google-map-demo"
              sx={{}}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={value}
              noOptionsText="No locations"
              onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
              renderOption={(props, option) => {
                const matches = option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match) => [match.offset, match.offset + match.length])
                );

                return (
                  <li {...props}>
                    <Grid container alignItems="center">
                      <Grid item sx={{ display: 'flex', width: 44 }}>
                        <LocationOnIcon sx={{ color: 'text.secondary' }} />
                      </Grid>
                      <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                        {parts.map((part, index) => (
                          <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                            {part.text}
                          </Box>
                        ))}

                        <Typography variant="body2" color="text.secondary">
                          {option.structured_formatting.secondary_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                );
              }}
            />
            <TextField
              required
              helperText="Total number of  units"
              type="text"
              label="No. of Unit"
              value={propUnit}
              onChange={(e) => setPropUnit(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 6 }}>
              {!response.isPending && (
                <LoadingButton fullWidth size="large" type="submit" onClick={handleCreateProperty} variant="contained">
                  Create
                </LoadingButton>
              )}
              {response.isPending && (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled
                >
                  Creating
                </LoadingButton>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
