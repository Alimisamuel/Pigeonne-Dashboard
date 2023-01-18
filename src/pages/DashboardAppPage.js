import {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet-async';
// @mui
import { Link, Navigate } from 'react-router-dom';
import { Grid, Container, Typography } from '@mui/material';
// import { projectFirestore } from '../firebase/Config';
// components
// sections

// import { useUserAuth } from '../context/AuthContexts';
import {

  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { useCollection } from '../hooks/useCollection';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {

const {document} = useCollection('properties')

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

     <Grid item xs={12} className="dashboard_banner" sx={{height:'120px', m:2}}>
       pigeonne
     </Grid>

         <Grid item xs={12} sm={6} md={6} sx={{cursor:'pointer'}} >
         <Link to="/dashboard/properties">
       <AppWidgetSummary title="Property Created" total={
        document===null ? 0 : document.length} icon={'mdi:house-city'} />
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
