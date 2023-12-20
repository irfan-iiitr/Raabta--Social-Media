import { Container ,Box, Image} from '@chakra-ui/react'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({post}) => {
   const {isLoading,userProfile}=useGetUserProfileById(post.createdBy);

   //console.log(userProfile)
  return (
    <>
    <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={5} overflow={"hidden"}>
            <Image src={post.imageURL} alt="post image" ></Image>
        </Box>
    <PostFooter post={post} creatorProfile={userProfile} />
    </>
  )
}

export default FeedPost
