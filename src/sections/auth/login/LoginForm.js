import { useState } from 'react';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Typography, Checkbox, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
// components
import { useLogin } from '../../../hooks/useLogin';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    // navigate('/dashboard', { replace: true });
    e.preventDefault();

    login(email, password);
  };

  return (
    <>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} value={email} />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox name="remember" label="Remember me" /> <Typography variant="subtitle2">Remember me</Typography>
        </Box>
        <Link variant="subtitle2" underline="hover" href="/forgetPassword">
          Forgot password?
        </Link>
      </Stack>

      {!isPending && (
        <LoadingButton fullWidth size="large" type="submit" onClick={handleClick} variant="contained">
          Login
        </LoadingButton>
      )}
      {isPending && (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled
        >
          Loging in
        </LoadingButton>
      )}
    </>
  );
}
