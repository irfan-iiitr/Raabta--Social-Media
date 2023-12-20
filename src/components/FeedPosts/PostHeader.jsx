import { Avatar, Flex ,Box,Text, SkeletonCircle, Skeleton, Button} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useFollowUser from '../../hooks/useFollowUser'
import { timeAgo } from '../../utils/timeAgo'

const PostHeader = ({post,creatorProfile}) => {
   const{handleFollowUser,isFollowing,isUpdating} =useFollowUser(post.createdBy)  


  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
         {
          creatorProfile?(
            <Link to={`/${creatorProfile.username}`}>
            <Avatar src={creatorProfile.profilePicURL?creatorProfile.profilePicURL:"https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"} alt='user profile pic' size={"sm"} />
            </Link>
          ): (
            <SkeletonCircle size="10" />
          )
         }
          {
          creatorProfile?(
            
            <Link to={`/${creatorProfile.username}`}>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}> 
                {creatorProfile.username}
                <Box color={"gray.500"}> {timeAgo(post.createdAt)}</Box>
            </Flex>
            </Link>
                    
          ): (
            <Skeleton h={"10px"} w={"100px"}></Skeleton>
          )
         }
           
        </Flex>

        <Box  cursor={"pointer"}>
            <Button fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{color:"white"}} transition={"0.2s ease-in-out"}
            size={"xs"} bg={"transparent"} onClick={handleFollowUser} isLoading={isUpdating}
            > {isFollowing?"Unfollow":"Follow"  }   </Button>
        </Box>
    </Flex>
  )
}

export default PostHeader

