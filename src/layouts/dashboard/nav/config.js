// component
import ApartmentIcon from '@mui/icons-material/Apartment';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },

  {
    title: 'properties',
    path: '/dashboard/properties',
    icon:<ApartmentIcon/>
  },

];

export default navConfig;
