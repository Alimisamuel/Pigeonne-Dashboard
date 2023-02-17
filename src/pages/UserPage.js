import { Helmet } from 'react-helmet-async';
import { filter, } from 'lodash';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Box,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CssBaseline,
  Skeleton,
  TextField,
  Divider,
  Grid,
  Popover,
  Tooltip,
  TableHead,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import moment from 'moment';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// Firetore Hook
import { projectFirestore } from '../firebase/Config';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#037440',
    },
  },
});

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    lg: 600,
    md: 800,
    xs: 370,
    sm: 550,
  },
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

const TABLE_HEAD = [
  { id: 'name', label: 'Properties', alignRight: false },
  { id: 'company', label: 'Property ID', alignRight: false },
  { id: 'role', label: 'Total number of units', alignRight: false },
  { id: 'isVerified', label: 'Successful deliveries', alignRight: false },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function Row(props, docid) {
  const { row } = props;
  const [openCol, setOpenCol] = useState(false);
  const [open, setOpen] = useState(false);
  const { deleteDocument } = useFirestore('Properties');
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const [propName, setPropName] = useState('');
  const [address, setaddress] = useState('');
  const [propID, setPropID] = useState('');
  const [propUnit, setUnit] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [documentUnit, setDocumentUnit] = useState([]);
  const [deliveryUnit, setDeliveryUnit] = useState([]);

  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------

  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };
    // ----------------------------------------------------------------------

  const handleClosePop = () => {
    setAnchorEl(null);
  };
    // ----------------------------------------------------------------------

  const openPop = Boolean(anchorEl);

  const id = openPop ? 'simple-popover' : undefined;



  // Get single property for modal
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  const handleOpen = (id) => {
    setOpen(true);
    const docRef = projectFirestore.collection('Properties').doc(id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPropName(doc.data().propName);
          setaddress(doc.data().address);
          setPropID(id);
          setUnit(doc.data().propUnit);

          const creeatedAtData = new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString('en-US');
          setCreatedAt(creeatedAtData);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };



  // Get single property for Collapse
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------



  const handleCollapse = (id) => {

    setOpenCol(!openCol);
    const docRef = projectFirestore.collection('Properties').doc(id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data().propName);
          setPropName(doc.data().propName);
          setaddress(doc.data().address);
          setPropID(id);
          setUnit(doc.data().propUnit);

          const creeatedAtData = new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString('en-US');
          setCreatedAt(creeatedAtData);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });


    documentUnit.map((user) => {
      const ref = projectFirestore.collection('Delivery').where('userId', '==', user.id);
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
            console.log('Samuuna', result);
          });

          // update State
          setDeliveryUnit(result);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    });
  
    const ref = projectFirestore.collection('Users').where('propertyId', '==', id);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
          console.log('Samuu', result);
      
        });

        // update State
        setDocumentUnit(result);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  };

  // Save changes function
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------

  const datum = deliveryUnit.length ?? []


  const handleSaveChanges = (id) => {
    setLoading(true);
    const Ref = projectFirestore.collection('Properties').doc(id);

    return Ref.update({
      propName,
      address,
      propUnit,
    })
      .then(() => {
        setLoading(false);
        window.location.reload(true);
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  const activeUnit = documentUnit ?? [];

  const inactiveUnit = row.propUnit - activeUnit.length;
  const activePercentage = (activeUnit.length / row.propUnit) * 100;
  const percentFixed = parseFloat(activePercentage.toFixed(2));

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={row.id}>
        <TableCell>
          <IconButton key={row.id} aria-label="expand row" size="small" onClick={() => handleCollapse(row.id)}>
            {openCol ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{ cursor: 'pointer' }}
          component="th"
          scope="row"
          key={row.id}
          onClick={() => handleOpen(row.id)}
        >
          <Tooltip title="Click to edit and delete">
            <Typography variant='body'>

          {row.propName}
            </Typography>
          </Tooltip>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.propUnit}</TableCell>
        <TableCell>{new Date(row.createdAt.seconds * 1000).toLocaleDateString('en-US')}</TableCell>
      </TableRow>
      <TableRow sx={{ bgcolor: '#B2BEB5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCol} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bolder' }} gutterBottom component="div">
                More Information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bolder' }}>Property Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bolder' }}>Active Units</TableCell>
                    <TableCell sx={{ fontWeight: 'bolder' }}>Inactive Units</TableCell>
                    <TableCell sx={{ fontWeight: 'bolder' }}>Successful deliveries</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {address}
                    </TableCell>
                    <TableCell>
                      {activeUnit.length}
                      <Typography variant="caption" sx={{ color: 'gray', ml: 3 }}>
                        {percentFixed}%
                      </Typography>
                    </TableCell>
                    <TableCell>{inactiveUnit}</TableCell>
                    <TableCell>{datum}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
              Edit and view property informations
            </Typography>
            <IconButton onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 5 }} />

          {/* <<<<<<<<<<<>>>>>>>>>>>>>>>> */}
          <TextField
            variant="standard"
            type="text"
            value={propName}
            fullWidth
            onChange={(e) => setPropName(e.target.value)}
            size="small"
            margin="normal"
            label="Property Name"
          />

          <TextField
            variant="standard"
            type="text"
            value={address}
            fullWidth
            margin="normal"
            onChange={(e) => setaddress(e.target.value)}
            size="small"
            label="Property Address"
          />

          <TextField
            variant="standard"
            type="text"
            value={propUnit}
            fullWidth
            margin="normal"
            onChange={(e) => setUnit(e.target.value)}
            size="small"
            label="Total No. of  Units"
          />

          {/* <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>> */}

          <Box sx={{ mt: 4, border: '1px solid #000', borderRadius: '5px', p: 3 }}>
            <Grid container spacing={3} p={2}>
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
                  Document ID:
                </Typography>
                <Typography variant="body1">{propID}</Typography>
              </Grid>
              <Grid Item ml={4}>
                <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
                  Date Created:
                </Typography>
                <Typography variant="body1">{createdAt}</Typography>
              </Grid>
            </Grid>
          </Box>
          {/* <<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <LoadingButton variant="outlined" color="error" onClick={handleClickPop}>
              <DeleteIcon sx={{ fontSize: '15px', mr: 1 }} />
              Delete{' '}
            </LoadingButton>

            {!loading && (
              <LoadingButton
                size="small"
                type="submit"
                key={propID}
                onClick={() => handleSaveChanges(propID)}
                variant="contained"
              >
                Save Changes
              </LoadingButton>
            )}
            {loading && (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                size="small"
                type="submit"
                variant="contained"
                disabled
              >
                Updating Document
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Modal>

      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Are you sure </Typography>
        <Box sx={{ m: 2 }}>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ mr: 2 }}
            onClick={() => {
              deleteDocument(propID);
              handleClosePop();
              handleClose();
            }}
            key={propID}
          >
            Yes
          </Button>
          <Button variant="contained" size="small" onClick={handleClosePop}>
            No
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

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



function applySortFilter(array, comparator, query, date) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.propName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  if (date) {
    return filter(
      array,
      (_user) => moment(_user.createdAt.seconds * 1000).diff(moment(), 'day') >= date
    );
  }
  // if(date === "thisWeek"){
  //   console.log("Happy")
  //   const today = moment().date()

  //   return filter(
  //     array,
  //     (_user) => new Date(_user.createdAt.seconds * 1000).toLocaleDateString('en-US').diff(today, 'days')

  //   );
  // }
  return stabilizedThis.map((el) => el[0]);
}


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserPage(props) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [filterDate, setFilterDate] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const user = JSON.parse(window.localStorage.getItem('user'));

  const { document } = useCollection('Properties', ['uid', '==', user.uid]);

  const USERLIST = document ?? [];

  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
  const handleFilterByDate = (event) => {
    setPage(0);
    setFilterDate(event.target.value);
    console.log(filterDate, 'Ebum');
  };

  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName, filterDate);

  const isNotFound = !filteredUsers.length && !!filterName;
  const isNotFoundDate = !filteredUsers.length && !!filterDate;

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
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              filterDate={filterDate}
              onFilterDate={handleFilterByDate}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                {/* <<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>> */}
                {USERLIST.length === 0 && (
                  <>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />
                  </>
                  //  >>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<
                )}

                <Table aria-label="collapsible table">
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
       
                  />

                  <TableBody>
         
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { propName, id, propUnit } = row;

                      return (
                        <>
                          {/* <<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>> */}
                          <Row key={row.id} row={row} />
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
                  {isNotFoundDate && (
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
                              <strong>&quot;{filterDate}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>

                {/* <<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>> */}
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

        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<< */}
      </ThemeProvider>
    </>
  );
}
