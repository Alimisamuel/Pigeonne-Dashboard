import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useUserAuth } from '../../../context/AuthContexts';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const {logIn} = useUserAuth();
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false);




  const handleClick = async (e) => {
    // navigate('/dashboard', { replace: true });
e.preventDefault() 
 
try{
await logIn(email, password)
navigate("/dashboard")
}catch(error){
  setError(error.message)
}

  };




  return (
    <>
     
      <Stack spacing={3}>
      {error && <Alert severity='error'>{error}</Alert>}
        <TextField name="email" label="Email address"
        onChange={(e)=>setEmail(e.target.value)}
        value={email} />

        <TextField
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
          name="password"
          label="Password"
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
