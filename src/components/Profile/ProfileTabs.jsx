import { Flex ,Text, Box} from '@chakra-ui/react'
import React from 'react'

const ProfileTabs = () => {
  return (
    <Flex w={"full"} justifyContent={"center"} gap={{base:4,sm:10}} textTransform={"uppercase"} fontWeight={"bold"}>
           
           <Flex borderTop={"1px solid white"} alignItems={"center"} p={"3"} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"Block"}} >Posts</Text>
           </Flex>
          
    </Flex>
  )
}

export default ProfileTabs
