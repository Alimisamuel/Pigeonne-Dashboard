// @mui
import PropTypes from 'prop-types';
import { alpha, styled ,ThemeProvider, createTheme} from '@mui/material/styles';
import { Card, CircularProgress, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { useCollection } from '../../../hooks/useCollection';

// ----------------------------------------------------------------------


const darkTheme = createTheme({
  palette: {

    primary: {
      main: '#4AEFA0',
    },
  },
});
const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  const {document} = useCollection('properties')
  console.log(document)
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: "#f0f0f0",
        bgcolor: "#037440",
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: "#f0f0f0",
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>


        
        {(total) === 0 ?
         <CircularProgress color="inherit" />
         :
         <Typography variant="h3">
       { fShortenNumber(total)}
        </Typography>
        }

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
    </ThemeProvider>
  );
}
