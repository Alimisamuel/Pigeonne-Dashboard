import { Helmet } from 'react-helmet-async';
// @mui

import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import { useUserAuth } from '../context/AuthContexts';
import {

  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
const {user } = useUserAuth(); 

  return (
    <>
      <Helmet>
        <title> Dashboard | Pigeonne </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user && user.email}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Property Created" total={1} icon={'mdi:house-city'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Deliveries" total={1352831} color="info" icon={'carbon:delivery'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

        </Grid>
      </Container>
    </>
  );
}
