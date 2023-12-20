import { Avatar, Button, Flex,Text} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'
const SuggestedHeader = () => {
  const {handleLogout,loading}=useLogout();
 const authUser= useAuthStore(state=>state.user);
 console.log(authUser)
 if(!authUser) return null;


  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} mt={12} mb={8}>
        <Flex alignItems={"center"} gap={12}>
        <Link to={`${authUser.username}`}>
					<Avatar size={"md"} src={authUser.profilePicURL} />
				</Link>
        <Link to={`${authUser.username}`}>
            <Text fontSize={12} fontWeight={"bold"} gap={2}>{authUser.username}</Text>
            </Link>
        </Flex>

        <Button   fontSize={14} fontWeight={"medium"} color='blue.400' style={{textDecoration:"none"}} cursor={"pointer"}
        onClick={handleLogout} isLoading={loading}
        >
            Logout
        </Button>
    </Flex>
  )
}

export default SuggestedHeader
