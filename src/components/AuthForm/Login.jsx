import { Input } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import useAuthStore from '../../store/authStore';

const Login = () => {


    const [inputs,setInputs]=useState({
        email:'',
        password:'',
    });
    const {loading,error,login}=useLogin();
    


  return (
   <>
      <Input placeholder='Email' fontSize={14} type='email' value={inputs.email} onChange={(e)=>setInputs({...inputs,email:e.target.value})}></Input>
            <Input placeholder='Password' fontSize={14} type='password' value={inputs.password}  onChange={(e)=>setInputs({...inputs,password:e.target.value})}></Input>
       

            {
        error && (
            <Alert status='error' fontSize={13}  p={2} borderRadius={4}>
                <AlertIcon fontSize={12}/>
                {error.message}
            </Alert>
        )
     }


            <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14}
                onClick={()=>login(inputs)} isLoading={loading}
            >
               Log In
            </Button>
   </>
  )
}

export default Login
