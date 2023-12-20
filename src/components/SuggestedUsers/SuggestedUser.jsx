import { Avatar, Button, Flex, VStack ,Box} from '@chakra-ui/react'
import { color } from 'framer-motion';
import React from 'react'
import useAuthStore from '../../store/authStore';
import useFollowUser from '../../hooks/useFollowUser';
import { Link } from 'react-router-dom';

const SuggestedUser = ({user,setUser}) => {
   const {isFollowing,isUpdating,handleFollowUser}=useFollowUser(user.uid);
   const authUser=useAuthStore(state=>state.user);
   const onFollowUser=async()=>{
    await handleFollowUser();
    setUser({...user,followers:isFollowing ? user.followers.filter(uid=>uid!==authUser.uid) : [...user.followers,authUser.uid]})
   }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
            <Avatar src={user.profilePicURL} size={"md"}></Avatar>
            </Link>
            <VStack  spacing={2}>
            <Link to={`/${user.username}`}>
                <Box fontSize="12" fontWeight="bold" >{user.fullName}</Box>
                </Link>
                <Box fontSize="10" color={"gray.500"} >{user.followers.length} Followers</Box>
            </VStack>
        </Flex>
       {authUser.uid !== user.uid && (
         <Button fontSize={13} p={0} fontWeight={"medium "} bg={"transparent"} height={"max-content"} color={"blue.500"} _hover={{color:"white"}}
         onClick={onFollowUser} isLoading={isUpdating}>
             {isFollowing ? "Following" : "Follow"}
         </Button>
        )}
    </Flex>
  )
}

export default SuggestedUser
