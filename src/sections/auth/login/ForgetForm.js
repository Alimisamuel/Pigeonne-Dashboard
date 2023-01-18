// import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // @mui
// import { Stack, TextField, Alert } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// // components
// // import { useUserAuth } from '../../../context/AuthContexts';


// // ----------------------------------------------------------------------

// export default function ForgetForm() {
//   const [email, setEmail] = useState('')
// //   const navigate = useNavigate();
//   const {resetPassword} = useUserAuth();
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")





//   const handleClick = async (e) => {
//     // navigate('/dashboard', { replace: true });
// e.preventDefault() 
 
// try{
// await resetPassword(email)
// setSuccess("Message Sent")
// setError(!error)

// }catch(error){
//   setError(error.message)

// }

//   };




//   return (
//     <>
     
//       <Stack spacing={3}>
//       {error && <Alert severity='error'>{error}</Alert>}
//       {success && <Alert severity='success'>Reset password link has been sent successfully <br/> Please check your email to reset your password</Alert>}
//         <TextField name="email" label="Email address"
//         onChange={(e)=>setEmail(e.target.value)}
//         helperText="Input your email address used to create account"
//         value={email} />

      
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}> </Stack>

//       <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
//         Reset Password
//       </LoadingButton>
//     </>
//   );
// }
