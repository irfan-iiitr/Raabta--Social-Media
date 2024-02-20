import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import { Flex,VStack,Text,Box ,Link} from '@chakra-ui/react'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUser'


const SuggestedUsers = () => {
  const {isLoading,suggestedUsers}=useGetSuggestedUsers();
  if(isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4} >
      <SuggestedHeader></SuggestedHeader>

     {
      suggestedUsers.length!==0 &&(
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.600"} >Suggested For You</Text>

        <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}}  cursor={"pointer"}>See All</Text>
      </Flex>
      )
     }

      {
        suggestedUsers.map(user=>(
          <SuggestedUser key={user.uid} user={user}></SuggestedUser>
        ))
      }

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"} >
        Built By {" "}
        <Link href="https://github.com/irfan-iiitr" target='_blank' color='blue.500' fontSize={14}> Irfan Ansari</Link>
      </Box>
    </VStack>
  )
}

export default SuggestedUsers
