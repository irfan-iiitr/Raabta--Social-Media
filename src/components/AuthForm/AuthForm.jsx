import { Box, VStack,Image, Input ,Button, Flex,Text} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import GoogleAuth from './GoogleAuth';

const AuthForm = () => {
    const navigate=useNavigate();
    const [isLoggedin,setIsLoggedIn]=useState(true);



  return (
    <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src='/logo.png' h={55} cursor={"pointer"} alt='Instagram'></Image>
           
            {isLoggedin ? <Login></Login>:<SignUp></SignUp>}


           {/* ------OR------- */}
            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                <Box flex={2} h={"1px"} bg={"gray.400"} />
                    <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={"1px"} bg={"gray.400"} />
            </Flex>
           <GoogleAuth prefix={!isLoggedin? "Signup": "Login"} />
        </VStack>
    </Box>

<Box border={"1px solid gray"} borderRadius={4} padding={4} >
<Flex alignItems={"center"} justifyContent={"center"}>
    <Box mx={2} fontSize={14}>
        {isLoggedin ? "Don't have an account?" : "Already have an account?"}
    </Box>
    <Box onClick={()=>setIsLoggedIn(!isLoggedin)} color={"blue.400"} cursor={"pointer"}>
        {isLoggedin ? "Sign Up" : "Log In"}
    </Box>

</Flex>
</Box>

</>
  )
}

export default AuthForm
