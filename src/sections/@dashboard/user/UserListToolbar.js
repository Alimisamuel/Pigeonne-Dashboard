import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Box } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 40,
  // marginLeft:5,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName }) {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <Box>
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            }
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '30%' }}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <Iconify icon="ic:round-filter-list" /> <Typography variant="caption">Filter</Typography>
            </IconButton>
          </Tooltip>
        )}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>
            Sort by Date
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            value={age}
            size="small"
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>
              <Box sx={{  width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{textAlign:'center'}}>Jan 2022 - Dec. 2022</Typography>
                <br />
                Today
              </Box>
            </MenuItem>
            <MenuItem value={20}>
              <Box sx={{ width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  Jan 25, 2022 - Dec 21, 2022
                </Typography>
                <br />
                Yesterday
              </Box>
            </MenuItem>
            <MenuItem value={30}>
            <Box sx={{ width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  Jan 25, 2022 - Dec 21, 2022
                </Typography>
                <br />
          This Week
              </Box>
            </MenuItem>
            <MenuItem value={40}>
            <Box sx={{ width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  Jan 25, 2022 - Dec 21, 2022
                </Typography>
                <br />
               Last Week
              </Box>
            </MenuItem>
            <MenuItem value={50}>
            <Box sx={{ width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  Jan 25, 2022 - Dec 21, 2022
                </Typography>
                <br />
                This Month
              </Box>
            </MenuItem>
            <MenuItem value={60}>
            <Box sx={{ width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  Jan 25, 2022 - Dec 21, 2022
                </Typography>
                <br />
                Last Week
              </Box>
            </MenuItem>
            <MenuItem value={70}>
            <Box sx={{ width: '100%', pl:2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  Jan 25, 2022 - Dec 21, 2022
                </Typography>
                <br />
                Last 3 Months
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </StyledRoot>
  );
}
