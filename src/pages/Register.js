import { Helmet } from 'react-helmet-async';
// @mui
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, Container, Typography, } from '@mui/material';
import { NavLink } from 'react-router-dom';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';

// sections
import { RegForm } from '../sections/auth/login';
import './dashboard.css'

// ----------------------------------------------------------------------

const darkTheme = createTheme({
  palette: {

    primary: {
      main: '#037440',
    },
  },
});
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  color:'#f0f0f0',
  flexDirection: 'column',
 
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,

}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>     
     <ThemeProvider theme={darkTheme}>
    <CssBaseline />

      <Helmet>
        <title> Sign up | Pigeonne </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection className='login_heroe'>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
        
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to Pigeonne
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <NavLink to="/login">
              <Link  variant="subtitle2">Login Here</Link></NavLink>
            </Typography>


            <RegForm />
          </StyledContent>
        </Container>
      </StyledRoot>
      </ThemeProvider>
    </>
  );
}
