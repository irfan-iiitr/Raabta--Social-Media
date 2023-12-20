import { Flex ,Text, Box} from '@chakra-ui/react'
import React from 'react'
import { BsGrid3X3 } from 'react-icons/bs'
import { BsBookmark } from 'react-icons/bs'
import { BsSuitHeart } from 'react-icons/bs'
const ProfileTabs = () => {
  return (
    <Flex w={"full"} justifyContent={"center"} gap={{base:4,sm:10}} textTransform={"uppercase"} fontWeight={"bold"}>
           
           <Flex borderTop={"1px solid white"} alignItems={"center"} p={"3"} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsGrid3X3 />
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"Block"}} >Posts</Text>
           </Flex>
           <Flex alignItems={"center"} p={"3"} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsBookmark />
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"Block"}} >Saved</Text>
           </Flex>
           <Flex  alignItems={"center"} p={"3"} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsSuitHeart />
            </Box>
            <Text fontSize={12} display={{base:"none", sm:"Block"}} >Likes</Text>
           </Flex>
    </Flex>
  )
}

export default ProfileTabs
