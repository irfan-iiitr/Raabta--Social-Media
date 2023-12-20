import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement ,Button, Alert, AlertIcon} from '@chakra-ui/react';
import React, { useState } from 'react'
import useSignInWithEmailAndPassword from '../../hooks/useSignInWithEmailAndPassword ';

const SignUp = () => {
    const [inputs,setInputs]=useState({
        fullName:'',
        userName: '',
        email:'',
        password:'',
    });
    const [showPassword,setShowPassword]=useState(false);
    const {loading,error,signup}= useSignInWithEmailAndPassword();

  return (
    <>
    <Input placeholder='Email' fontSize={14} type='email' value={inputs.email}  onChange={(e)=>setInputs({...inputs,email:e.target.value})}></Input>
    <Input placeholder='User Name' fontSize={14} type={"text"}  value={inputs.userName}   onChange={(e)=>setInputs({...inputs,userName:e.target.value})}></Input>
    <Input placeholder='Full name' fontSize={14} type='text' value={inputs.fullName}  onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}></Input>
     <InputGroup>
     <Input placeholder='Password' fontSize={14} type={showPassword? "text":"password"}   value={inputs.password}  onChange={(e)=>setInputs({...inputs,password:e.target.value})}></Input>
     <InputRightElement>
    <Button onClick={()=>setShowPassword(!showPassword)}> {showPassword?<ViewIcon/>:<ViewOffIcon/>}</Button>
     </InputRightElement>
     </InputGroup>
     
     {
        error && (
            <Alert status='error' fontSize={13}  p={2} borderRadius={4}>
                <AlertIcon fontSize={12}/>
                {error.message}
            </Alert>
        )
     }
          <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={()=>signup(inputs)} isLoading={loading}>
             Sign Up 
          </Button>
 </>
  )
}

export default SignUp
