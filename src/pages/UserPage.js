import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Box,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CssBaseline,
  Skeleton,
  Tooltip,
  TextField,
  Divider,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
import { useCollection } from '../hooks/useCollection';

import { useFirestore } from '../hooks/useFirestore';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#037440',
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:{
    lg:600
  },
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};
const TABLE_HEAD = [
  { id: 'name', label: 'Properties', alignRight: false },
  { id: 'company', label: 'Active units', alignRight: false },
  { id: 'role', label: 'Inactive units', alignRight: false },
  { id: 'isVerified', label: 'Successful deliveries', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.propName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { deleteDocument } = useFirestore('properties');
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { document } = useCollection('properties', ['uid', '==', user.uid]);
  const USERLIST = document ?? [];

  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(user);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  const [propName, setPropName] = useState('Next Dev Inc')
  const [propAddress, setPropAddress] = useState('Yaba college of education, lagos, Nigeria')
  const [propID, setPropID] = useState('9IXGPEQffdQ7JAQ76azJPWP1ZTX2')
  const [propUnit, setUnit] = useState('UF578')

  return (
    <>
      <Helmet>
        <title> Properties | Pigeonne </title>
      </Helmet>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h4" gutterBottom>
              Properties
            </Typography>
          </Stack>

          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                {USERLIST.length === 0 && (
                  <>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />
                  </>
                )}

                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                  <TableRow padding="checkbox" >
                  <TableCell component="th" scope="row" padding="none" />
                
                          <TableCell align='left'sx={{fontWeight:'bolder'}}   >
                            Total
                          </TableCell>
                          <TableCell align='left'sx={{fontWeight:'bolder', textAlign:'center'}}  >
                            1,054
                          </TableCell>
                          <TableCell align='left'sx={{fontWeight:'bolder', textAlign:'center'}}  >
                            14.4
                          </TableCell>
                          <TableCell align='left'sx={{fontWeight:'bolder', textAlign:'center'}}  >
                            20
                          </TableCell>
                         </TableRow>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { propName } = row;
                      const selectedUser = selected.indexOf(propName) !== -1;

                      return (
                        <>                       
                      
                        <TableRow hover key={USERLIST.id} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, propName)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                          <Tooltip title="Click to view and edit more info">

                              <Typography variant="subtitle2" noWrap sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                                {propName}
                              </Typography>
                          </Tooltip>
                            </Stack>
                          </TableCell>

                          <TableCell align="left"> </TableCell>

                          <TableCell align="left"> </TableCell>

                          <TableCell align="left"> </TableCell>
                   
                        </TableRow>
                      </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
 





      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Box mb={2} sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant="h6" sx={{fontWeight:'bolder'}}>Edit and view property informations</Typography>
         <IconButton onClick={handleClose}>
<HighlightOffIcon/>
         </IconButton>
          </Box>
          <Divider sx={{mb:5}}/>
         <TextField variant='outlined' 
         type="text"
         value={propName}
         fullWidth
         onChange={(e)=>setPropName(e.target.value)}
         size='small'
         margin='normal'
         label="Property Name"/>
         <TextField variant='outlined' 
         type="text"
         value={propAddress}
         fullWidth
         margin='normal'
         onChange={(e)=>setPropAddress(e.target.value)}
         size='small'
         label="Property Address"/>
         <TextField variant='outlined' 
         disabled
         type="text"
         value={propID}
         fullWidth
         margin='normal'
                      
         size='small'
         label="Property ID"/>
         <TextField variant='outlined' 
         disabled
         type="text"
         value={propUnit}
         fullWidth
         margin='normal'
                      
         size='small'
         label="No. of unit"/>
         <TextField variant='outlined' 
         disabled
         type="text"
         value={propUnit}
         fullWidth
         margin='normal'
                      
         size='small'
         label="Date created"/>

         <Box sx={{textAlign:'right', mt:5}}>
          <LoadingButton variant='contained'>Save changes</LoadingButton>
         </Box>
        </Box>
      </Modal>
      </ThemeProvider>
    </>
  );
}
