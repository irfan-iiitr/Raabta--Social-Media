import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'

const FeedPosts = () => {

  const {isLoading,posts}=useGetFeedPosts();
  const noPostsFound = !isLoading && posts.length === 0;
	if (noPostsFound) return <NoPostsFound />;
 

  return (
    <Container maxW={"container.sm"} py={10} px={2}>

      {isLoading && [0,1,2].map((_,idx)=> (
        <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size="10" />
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton height="10px" width="200px" />
              <Skeleton height="10px" width="200px" />
            </VStack>
          </Flex>

          <Skeleton w={"full"}>
            <Box h={"400px"}></Box>
          </Skeleton>
        </VStack>
      ))}
      {
        !isLoading && (
          <>
              { !isLoading && posts.length >0 && (
                posts.map((post)=>(
                  <FeedPost key={post.id} post={post} />
                )))
              }
          </>
        )
      }

{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)}
    
      
    </Container>
  )
}

export default FeedPosts
const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found</Text>
		</Flex>
	);
};