import { Flex, GridItem ,Text,Image,Box, Avatar, Divider, VStack,Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDisclosure } from '@chakra-ui/react';
import Caption from '../Comment/Caption';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Comments from '../Comment/Comments';
import PostFooter from '../FeedPosts/PostFooter';
import useUserProfileStore from '../../hooks/useProfileStore';
import useAuthStore from '../../store/authStore';
import { firestore, storage } from '../../firebase/firebase';
import { deleteObject } from 'firebase/storage';
import { arrayRemove, deleteDoc, updateDoc } from 'firebase/firestore';
import usePostStore from '../../store/postStore';
import useShowToast from '../../hooks/useShowToast';
import { Ref } from 'react';
import { ref } from 'firebase/storage';
import { doc } from 'firebase/firestore';


const ProfilePost = ({post}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile=useUserProfileStore((state)=>state.userProfile); //get user profile anywheere from /:username
  const authUser=useAuthStore((state)=>state.user); 

  const [isDeleting,setIsDeleting]=useState(false);
  const deletePost =usePostStore(state=>state.deletePost);
  const decrementPostCount=useUserProfileStore(state=>state.deletePost);
  const showToast=useShowToast();

  const handleDeletePost=async()=>{  
    if(!window.confirm("Are you sure you want to delete this post?")) return;
    if(isDeleting) return;

    try {
      setIsDeleting(true);
      const imageRef=ref(storage,`posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef=doc(firestore,"users",authUser.uid);
      await deleteDoc(doc(firestore,"posts",post.id));
      await updateDoc(userRef,{
        posts:arrayRemove(post.id)
      })
      deletePost(post.id);
      decrementPostCount(post.id);
      showToast("success","Post deleted successfully","success");

    } catch (error) {
      showToast("error", error.message, "error");

    }
    finally{
      setIsDeleting(false); 
    }
       
  }
  return (
   <>
    <GridItem cursor={"pointer"} borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1/1}>
      <Flex opacity={0} _hover={{opacity:1}} position={"absolute"} top={0} left={0} right={0} bottom={0}
      bg={"blackAlpha.700"} transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"} onClick={onOpen} >
        <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
          <Flex>
          <AiFillHeart size={20} />
          <Text fontWeight={"bold"} ml={2} >{post.likes.length}</Text>
          </Flex>

          <Flex>
          <FaComment size={20} />
          <Text fontWeight={"bold"} ml={2} >{post.comments.length}</Text>
          </Flex>


        </Flex>
      </Flex>
      <Image src={post.imageURL} w={"100%"} h={"100%"} objectFit={"cover"} ></Image>
    </GridItem>
  

    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base:"3xl", md:"5xl"}}>
        <ModalOverlay />
        <ModalContent>
          
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{base:"90", sm:"70%" ,md:"full"}} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
              <Flex borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} flex={1.5} alignItems={"center"} justifyContent={"center"}>
                <Image src={post.imageURL}></Image>
              </Flex>

              <Flex flex={1} flexDir={"column"} px={10} display={{base:"none", md:"flex"}}>
                <Flex alignItems={"center"} justifyContent={"space-between"} >
                <Flex alignItems={"center"} gap={4}>
                  <Avatar size={"sm"} src={userProfile.profilePicURL} name={"name user"}></Avatar>
                  <Text fontWeight={"bold"} fontSize={12}>{userProfile.username}</Text>
                </Flex>

                {
                  authUser?.uid===userProfile.uid && (
                    <Button _hover={{bg:"white",color:"red.600"}} borderRadius={4} p={1}  size={"sm"} bg={"transparent"}
                    isLoading={isDeleting}
                    onClick={handleDeletePost}>
                  <MdDelete size={20} cursor="pointer"></MdDelete>
                </Button>
                  )
                }

                </Flex>

                <Divider my={4} bg={"gray.500"}></Divider>
                <VStack alignItems={"flex-start"} maxH={"350px"} overflowY={"auto"} w={"full"} >

                  {/* CAPTION */}
									{post.caption && <Caption post={post} />}


                 {
                  post.comments.map((comment)=>(  
                    <Comments key={comment.id} comment={comment}></Comments>
                  ))
                 }
                </VStack>

                <Divider my={4} bg={"gray.800"} />

                <PostFooter isProfilePage={true}  post={post} ></PostFooter>


              </Flex>
            </Flex>
          </ModalBody>


        </ModalContent>
      </Modal>
    
   </>
  )
}

export default ProfilePost
