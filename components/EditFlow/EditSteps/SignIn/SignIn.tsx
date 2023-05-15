import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import {signIn} from 'next-auth/react';

const SignIn = () => {
  return (
    <div>
      <Button onClick={() => signIn('google')} variant='contained' startIcon={<Google/>}>
        Sign in with Google  
      </Button>
    </div>
  )
}

export default SignIn;
