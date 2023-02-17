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
import moment from 'moment/moment';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
  overflowX:'scroll',

 
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  // width: 240,
  height: 40,

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

// .........Date Format >>>>>>>>>>>>>>>>>

const todayDateFormated = moment().format('M/DD/YYYY');
const today = moment().format('M/DD/YYYY');

const dateFrom2 = moment().date();
const dateFrom3 = moment().subtract(90, 'd').diff(moment(), 'day');
const dateFrom4 = moment().subtract(30, 'd').diff(moment(), 'day');
const dateFrom5 = moment().subtract(14, 'd').diff(moment(), 'day');
const dateFrom6 = moment().subtract(7, 'd').diff(moment(), 'day');

const _7days = moment().subtract(7, 'd').format('M/DD/YYYY');
const _14days = moment().subtract(14, 'd').format('M/DD/YYYY');
const _30days = moment().subtract(30, 'd').format('M/DD/YYYY');
const _90days = moment().subtract(90, 'd').format('M/DD/YYYY');


// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  filterDate: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterDate: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, filterDate, onFilterDate }) {
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
{/* ...................................................... */}
{/* ...................................................... */}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: '14px' }}>
            Sort by Date
          </InputLabel>
          <Select
          
          sx={{width:200}}
            value={filterDate}
            onChange={onFilterDate}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            size="small"
            label="Age"
          >

            {/* ...................................................... */}
{/* ...................................................... */}
            <MenuItem value={'0'}>
              <Box sx={{ width: '100%', pl: 2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  {todayDateFormated}
                </Typography>
                <br />
                Today
              </Box>
            </MenuItem>

            <MenuItem value={dateFrom6}>
              <Box sx={{ width: '100%', pl: 2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                {`${_7days} - ${today}`}
                </Typography>
                <br />
                Last 7 days
              </Box>
            </MenuItem>
            <MenuItem value={dateFrom5}>
              <Box sx={{ width: '100%', pl: 2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                  {`${_14days} - ${today}`}
                </Typography>
                <br />
                Last 14 days
              </Box>
            </MenuItem>
            <MenuItem value={dateFrom4}>
              <Box sx={{ width: '100%', pl: 2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                {`${_30days} - ${today}`}
                </Typography>
                <br />
                Last 30 days
              </Box>
            </MenuItem>

            <MenuItem value={dateFrom3}>
              <Box sx={{ width: '100%', pl: 2 }}>
                <Typography variant="caption" sx={{ textAlign: 'center' }}>
                {`${_90days} - ${today}`}
                </Typography>
                <br />
                Last 90 days
              </Box>
            </MenuItem>
            <MenuItem value={''}>
              <Box sx={{ width: '100%', pl: 2 }}>Clear Filter</Box>
            </MenuItem>

            {/* ...................................................... */}
{/* ...................................................... */}
          </Select>
        </FormControl>
      </Box>
    </StyledRoot>
  );
}
