import { Container, Flex,Box ,Image, VStack} from '@chakra-ui/react'
import React from 'react'
import AuthForm from '../../AuthForm/AuthForm'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
    <Container maxW={"container.md"} padding={0}>

      <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* left hand side */}
          <Box display={{base:"none", md:"Block"}}>
              <Image src='/auth.png' h={650} alt='Phone image'></Image>
          </Box>
            {/* right hand side */}
          <VStack spacing={4} align={"stretch"}>
              <AuthForm></AuthForm>
              <Box textAlign={"center"}>Get the App.</Box>
              <Flex gap={5} justifyContent={"center"}>
                  <Image src='/playstore.png' h={10} alt='App store'></Image>
                  <Image src='/microsoft.png' h={10} alt='Google play'></Image>
              </Flex>
          </VStack>
      </Flex>
      
    </Container>
  </Flex>
  )
}

export default AuthPage
