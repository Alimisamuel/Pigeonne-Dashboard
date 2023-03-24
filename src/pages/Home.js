import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import './dashboard.css';
import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import NewNav from '../components/Home/NewNav';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#037440',
    },
  },
});

export default function Home  ()  {

  const d = new Date()
  const year = d.getFullYear()
  console.log(year)
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <NewNav />
        <div className="heroe">
          <div className="container">
            <Grid container>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                sx={{
                  mt: 8,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: '#f0f0f0',
                    fontFamily: 'pangram',
                    fontWeight: 'bolder',
                    fontSize: {
                      lg: '80px',
                      md: '80px',
                      sm: '65px',
                      xs: '40px',
                    },
                    lineHeight: {
                      lg: '100px',
                      md: '100px',
                      sm: '75px',
                    },
                    mt: 10,
                    mb: 2,
                  }}
                >
                  Your <br />
                  community's favorite amenity is here
                </Typography>
                <Typography
                  variant="body"
                  className="hereo_caption"
                  sx={{
                    fontFamily: 'pangram',
                    color: '#f0f0f0',
                    fontSize: {
                      lg: '20px',
                      md: '20px',
                      sm: '10px',
                      sx: '7px',
                    },
                  }}
                >
                  Offer your residents scheduled package deliveries as an amenity. Zero cost to you
                </Typography>
                <br /> 
                <Link
                to="/register"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <button  type="button" id="about" className="btn">
                  Get Started
                </button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
        <Box sx={{ height: '3px', bgcolor: '#f0f0f0' }}> </Box>
        <Box sx={{ height: '5px', bgcolor: '#4aefa0' }}> </Box>
        <Box sx={{ height: '7px', bgcolor: '#037440' }}> </Box>

        {/* .................About............ */}
        <div className="who-we-are ">
          <div className="container">
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography
                  className="home_h1"
                  variant="h1"
                  sx={{
                    fontSize: {
                      lg: '40px',
                      md: '40px',
                      sm: '35px',
                      xs: '30px',
                    },
                    textAlign: {
                      lg: 'right',
                      md: 'right',
                      sm: 'right',
                      xs: 'left',
                    },
                    fontFamily: 'pangram',
                    mr: 4,
                  }}
                >
                  WHO WE ARE?
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: {
                      lg: '19px',
                      md: '19px',
                      sm: '17px',
                      xs: '15px',
                    },
                    mb: 4,
                    fontFamily: 'pangram',

                    lineHeight: '28px',
                  }}
                >
                  Pigeonne is a last mile delivery service that guarantees safe and on time package deliveries to your
                  residents.
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <section id="">
          <div className="about" style={{ marginTop: '60px' }}>
            <div className="container">
              <Grid container>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ height: { lg: '500px', md: '500px', sm: '500px', xs: '200px' }, mb: { xs: 5 } }}
                >
                  <Paper elevation={24} className="image_box">
                    {' '}
                  </Paper>
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{
                    pl: {
                      lg: 5,
                      md: 5,
                      sm: 5,
                      xs: 0,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#037440',
                      fontSize: {
                        lg: '40px',
                        md: '40px',
                        sm: '35px',
                        xs: '30px',
                      },
                      fontWeight: 'bolder',
                      fontFamily: 'pangram',
                    }}
                  >
                    WHAT WE DO
                  </Typography>

                  <Box>
                    <p className="text">
                      Whether it’s stolen or misplaced packages. Residents are losing valuable items daily due to the
                      existing last mile delivery process.
                    </p>
                    {/* <p className="text">
                        Pigeonne is a last mile delivery service that guarantees
                        safe and on time package deliveries to your residents.
                      </p> */}
                    <p className="text">
                      We protect their packages by receiving it at our secure facilities called nests, and we notify the
                      resident via the app once it arrives. Once notified the residents can schedule their in person
                      delivery for their preferred time on the app.
                    </p>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
        </section>

        {/* ...........Benefit ............. */}

        <section className="service">
          <div className="container" style={{ paddingTop: '30px' }}>
            <h4
              style={{
                fontFamily: 'pangram',
                fontSize: '50px',
                textAlign: 'center',
                color: '#000',
              }}
            >
              Deliveries are a part of your residents daily life and with{' '}
              <span style={{ color: '#4aefa0' }}>Pigeonne </span>you can:
            </h4>
            <Grid container>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: {
                    xs: 0,
                  },
                }}
              >
                <Box sx={{ pr: 5 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bolder',
                      fontSize: {
                        lg: '30px',
                        md: '30px',
                        sm: '27px',
                        xs: '20px',
                      },
                      fontFamily: 'pangram',
                    }}
                  >
                    Boost resident satisfaction
                  </Typography>
                  <div className="border"> </div>
                  <p className="text">Improve their wellbeing by offering them safe deliveries on their schedule. </p>
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                sx={{
                  mb: {
                    xs: 7,
                  },
                }}
                className="boost"
              >
                {' '}
              </Grid>

              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                sx={{
                  mb: {
                    xs: 3,
                  },
                }}
                className="revenue"
              >
                {' '}
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  mb: {
                    xs: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    pl: {
                      lg: 7,
                      md: 7,
                      sm: 7,
                      xs: 0,
                    },
                    display: 'flex',
                    justifyItems: 'right',
                    flexDirection: 'column',
                    mb: {
                      xs: 3,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bolder',
                      fontSize: {
                        lg: '30px',
                        md: '30px',
                        sm: '27px',
                        xs: '20px',
                      },
                      fontFamily: 'pangram',
                    }}
                  >
                    Boost revenue
                  </Typography>
                  <div className="border"> </div>
                  <p className="text">
                    Increase revenue by offering secured package delivery as a premium amenity. Also experience cost
                    savings by eliminating package management from your operations.{' '}
                  </p>
                </Box>
              </Grid>
              <Grid
                item
                md={6}
                lg={6}
                sm={6}
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ pr: 5 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bolder',
                      fontSize: {
                        lg: '30px',
                        md: '30px',
                        sm: '27px',
                        xs: '20px',
                      },
                      fontFamily: 'pangram',
                    }}
                  >
                    Maximize space
                  </Typography>
                  <div className="border"> </div>
                  <p className="text">
                    Make package lockers and mail rooms a thing of the past. Turn the extra space into other amenities
                    your residents will love.{' '}
                  </p>
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={12}
                sx={{
                  mb: {
                    xs: 7,
                  },
                }}
                className="resident"
              > </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12} className="time">
                {' '}
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    pl: {
                      lg: 7,
                      md: 7,
                      sm: 7,
                      xs: 0,
                    },
                    display: 'flex',
                    justifyItems: 'right',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bolder',
                      fontSize: {
                        lg: '30px',
                        md: '30px',
                        sm: '27px',
                        xs: '20px',
                      },
                      color: '#000',
                      fontFamily: 'pangram',
                    }}
                  >
                    Save time and effort
                  </Typography>
                  <div className="border"> </div>
                  <p className="text">
                    your onsite team already have a lot to juggle. Package management should not be of them. Give your
                    team time back to serve your residents.{' '}
                  </p>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* .............footer............. */}
        <section className="ready">
          <div className="container" style={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'pangram',
                fontWeight: 'bolder',
                fontSize: {
                  lg: '40px',
                  md: '40px',
                  sm: '35px',
                  xs: '20px',
                },
                color: '#000',
              }}
            >
              Ready to step up your amenity game with <span style={{ color: '#4aefa0' }}>Pigeonne?</span>
            </Typography>
            <Link
                to="/register"
                style={{ textDecoration: 'none', color: 'black' }}
              >
            <Button
              variant="contained"
              sx={{
                fontSize: '',
                fontFamily: 'pangram',
                borderRadius: '0px',
                mt: 5,
              }}
            >
              Get Started
            </Button>
            </Link>
          </div>
        </section>
        <div className="footer">
          <Typography
            variant="body"
            sx={{
              color: '#f0f0f0',
              fontFamily: 'pangram',
              fontSize: {
                lg: '16px',
                md: '16px',
                sm: '16px',
                xs: '13px',
              },
            }}
          >
            All rights are reserved {year} Pigeonne
          </Typography>
        </div>
      </ThemeProvider>
    </>
  );
};


