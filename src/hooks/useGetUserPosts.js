import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "./useProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getPosts = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);

			try {
				const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);

				const posts = [];
				querySnapshot.forEach((doc) => {
					posts.push({ ...doc.data(), id: doc.id });
				});

				posts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(posts);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [setPosts, userProfile, showToast]);

	return { isLoading, posts };
};

export default useGetUserPosts;

















// import React, { useEffect  ,useState } from 'react'
// import usePostStore from '../store/postStore';
// import useShowToast from './useShowToast';
// import useUserProfileStore from './useProfileStore';

// const useGetUserPosts = () => {
//      const [isLoading, setIsLoading] = useState(false);
//         const {posts,setPosts}=usePostStore();
//         const showToast = useShowToast();

//         const userProfile=useUserProfileStore((state) =>state.userProfile);

//         useEffect(()=>{
//              const getPosts =async ()=>{
//                 if(!userProfile) return;

//                 setIsLoading(true);
//                 setPosts([])

//                 try{
//                    const q= query(collection(firestore,"posts"),where("uid","==",userProfile.uid),orderBy("createdAt","desc"));
//                    const querySnapshot= await getDocs(q);
//                      const posts=[];
//                         querySnapshot.forEach((doc)=>{
//                             posts.push({...doc.data(),id:doc.id}); //we are adding id so that it can be used in key while mappping html elememnts
//                         });

//                         posts.sort((a,b)=> b.createdAt-a.createdAt);
//                         setPosts(posts)


//                 }
//                 catch(error){
//                     showToast("Error",error.message,"error");
//                 }
//                 finally{
//                     setIsLoading(false);
//                 }
//              }
//         },{setPosts,userProfile,showToast})

//         return {isLoading,posts};


// }

// export default useGetUserPosts
