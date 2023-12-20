import { Container, Flex, Skeleton, VStack,Text ,Link,SkeletonCircle} from '@chakra-ui/react'
import React from 'react'
import ProfileHeader from '../../Profile/ProfileHeader'
import ProfileTabs from '../../Profile/ProfileTabs'
import ProfilePosts from '../../Profile/ProfilePosts'
import { useParams } from 'react-router-dom'
import useGetUserProfileByUsername from '../../../hooks/useGetUserProfileByUsername'
import {Link as RouterLink} from 'react-router-dom'

const ProfilePage = () => {
    const {username}=useParams();  // /:username        /:uid then const {uid} =
    const {isLoading, userProfile}=useGetUserProfileByUsername(username);
    console.log(username);
    console.log(userProfile);

    if(!isLoading && !userProfile) return <UserNotFound></UserNotFound>


  return (
    <Container  maxW={"container.lg"} py={5}>
      <Flex py={10} px={4} pl={{base:4,md:10}} w={"full"} mx={"auto"} flexDirection={"column"}>

       {!isLoading && userProfile && <ProfileHeader />}

       {isLoading && <ProfileHeaderSkeleton />}
      
      </Flex>

      <Flex px={{base:2,sm:4}} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"whiteAlpha.300"} direction={"column"} >
        <ProfileTabs></ProfileTabs>
        <ProfilePosts></ProfilePosts>
      </Flex>
    </Container>
  )
}

export default ProfilePage


const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text fontSize={"2xl"}>User Not Found</Text>
			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};


// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};