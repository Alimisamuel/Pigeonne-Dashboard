import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Navigate } from 'react-router-dom';
import { Grid, Container, Typography, Avatar } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
// import { projectFirestore } from '../firebase/Config';
// components
// sections

// import { useUserAuth } from '../context/AuthContexts';
import { Box } from '@mui/system';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const user = JSON.parse(window.localStorage.getItem('user'));

  console.log(user.uid, "SAN")
  const { document } = useCollection('properties',
  ["uid", "==", user.uid],
  ["createdAt", "desc"])

  
  const USERDATA = document ?? []
  return (
    <>
      <Helmet>
        <title> Dashboard | Pigeonne </title>
      </Helmet>
      <Container maxWidth="xl">
   <Typography variant="h4" sx={{ mb: 5 }}>
     Hi, Welcome back
      {/* {user && user.email} */}
   </Typography>


   <Grid container spacing={3}>

   <Grid item xs={12} className="dashboard_banner" sx={{ height: '120px', m: 2, ml: 3, mr: 0 }}>
       pigeonne
     </Grid>

         <Grid item xs={12} sm={6} md={6} sx={{cursor:'pointer'}} >
         <Link to="/dashboard/properties">
       <AppWidgetSummary title="Property Created" total={
        document===null ? null : document.length} icon={'mdi:house-city'} />
       </Link>
     </Grid>

     <Grid item xs={12} sm={6} md={6} sx={{cursor:'pointer'}}>
       <AppWidgetSummary title="Deliveries" total={1352831} color="info" icon={'carbon:delivery'} />
     </Grid>
{/* 
      <Grid item xs={12} sm={6} md={3}>
       <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
     </Grid> 
     <Grid item xs={12} sm={6} md={3}>
       <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
     </Grid>  */}

   </Grid>
 </Container>
   
    </>
  );
}




{/* <Container maxWidth="xl">
<Typography variant="h4" sx={{ mb: 5 }}>
  Hi, Welcome back */}
  {/* {user && user.email} */}
// </Typography>

// <Box Container>
//   <Grid item xs={12} className="dashboard_banner" sx={{ height: '120px', m: 2, ml: 0, mr: 0 }}>
//     pigeonne
//   </Grid>
//   <Grid container spacing={2}>
//     <Grid item lg={8} xs={12}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={6} sx={{ cursor: 'pointer' }}>
//           <Link to="/dashboard/properties">
//             <AppWidgetSummary
//               title="Property Created"
//               total={
// document===null ? 0 : document.length}
//               icon={'mdi:house-city'}
//             />
//           </Link>
//         </Grid>

//         <Grid item xs={12} sm={6} md={6} sx={{ cursor: 'not-allowed' }}>
//           <AppWidgetSummary title="Deliveries" total={1352831} color="info" icon={'carbon:delivery'} />
//         </Grid>
        {/* 
<Grid item xs={12} sm={6} md={3}>
<AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
</Grid> 

<Grid item xs={12} sm={6} md={3}>
<AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
</Grid>  */}
//       </Grid>
//     </Grid>
//     <Grid item lg={4} xs={12}>
//       <Grid container>
//         <Grid item lg={12} xs={12}  pt={0} pr={0}>
//           <Box sx={{display:'flex', alignItems:'center', bgcolor:'rgb(3, 116, 64, 0.5)'}}>
//             <Box sx={{bgcolor:'ButtonFace', py:2, px:3, mr:3}}>

//             <LocalShippingIcon/>
//             </Box>
//             <Typography variant='"h5' sx={{fontWeight:'bolder'}}>Latest Delivery</Typography>
           
//           </Box>
//           <Box sx={{bgcolor:'ButtonFace', height:'420px'}} mt={1} p={1}>
// <Grid container >
// <Grid item xs={12} sx={{background:'#fff', display:'flex', alignItems:'center', p:2, mb:1}}>
// <Avatar sx={{mr:2}}>
// <WhereToVoteIcon/>
// </Avatar>
// <Box>
// <Typography variant='h6'>Delivery Title</Typography>
// <Typography variant='caption'>Apartment Name</Typography>
// </Box>
// </Grid>
// <Grid item xs={12} sx={{background:'#fff', display:'flex', alignItems:'center', p:2, mb:1}}>
// <Avatar sx={{mr:2}}>
// <WhereToVoteIcon/>
// </Avatar>
// <Box>
// <Typography variant='h6'>Delivery Title</Typography>
// <Typography variant='caption'>Apartment Name</Typography>
// </Box>
// </Grid>
// <Grid item xs={12} sx={{background:'#fff', display:'flex', alignItems:'center', p:2, mb:1}}>
// <Avatar sx={{mr:2}}>
// <WhereToVoteIcon/>
// </Avatar>
// <Box>
// <Typography variant='h6'>Delivery Title</Typography>
// <Typography variant='caption'>Apartment Name</Typography>
// </Box>
// </Grid>
// </Grid>
//             </Box>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// </Box>
// </Container>
