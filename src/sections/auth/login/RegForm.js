import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
// components
import { useSignUp } from '../../../hooks/useSignUp';
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function RegForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate();
  const {signup , isPending, error} = useSignUp()



  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {

e.preventDefault() 
signup(email, password, displayName)


  };

  return (
    <>
      <Stack spacing={3}>
        {error && <Alert severity='error'>{error}</Alert>}

        <TextField name="text" label="Company Name" onChange={(e)=>setDisplayName(e.target.value)}  value={displayName}/>
        <TextField name="email" label="Email address" 
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
      

        <TextField
          name="password"
          label="Password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
{!isPending && 
      <LoadingButton fullWidth size="large" type="submit" onClick={handleClick} variant="contained">
        Sign in
      </LoadingButton>}
{isPending && 
      <LoadingButton   loading
      loadingPosition="start"      startIcon={<SaveIcon />} fullWidth size="large" type="submit" variant="contained" disabled >
        Signing in
      </LoadingButton>}
    </>
  );
}
