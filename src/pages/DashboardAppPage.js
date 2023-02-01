
import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Navigate } from 'react-router-dom';
import { Grid, Container, Typography } from '@mui/material';

import { AppWidgetSummary } from '../sections/@dashboard/app';
import { useCollection } from '../hooks/useCollection';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  const user = JSON.parse(window.localStorage.getItem('user'));

  // console.log(user.uid, "SAN")
  const { document } = useCollection('Properties',
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


   </Grid>
 </Container>
   
    </>
  );
}




