import React from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, setDoc ,query,where,getDocs} from "firebase/firestore"; 
import useShowToast from './useShowToast';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuthStore from '../store/authStore';



const useSignInWithEmailAndPassword  = () => {
  const showToast =useShowToast();
  const loginUser = useAuthStore(state => state.login);
  const logoutUser = useAuthStore(state => state.logout);
  const [ createUserWithEmailAndPassword, user, loading, error ] = useCreateUserWithEmailAndPassword(auth);

    const signup = async (inputs) => {
      if(!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName){
        showToast("Error", "Please enter all the fields", "error")
        return;
      }
       

      // firebase query to check if a user exissts
      const usersREef=collection(firestore,"users");  //users - name of collection
      const q=query(usersREef,where("userName","==",inputs.userName));
      const querySnapshot=await getDocs(q);
      if(!querySnapshot.empty){
        showToast("Error", "Username already taken", "error")
        return;
      }




      try{
           const newUser =await createUserWithEmailAndPassword(inputs.email, inputs.password);
           if(!newUser && error)
            {
              showToast("Error", error.message, "error")
              return;
            }

            if(newUser){
              const UserDoc={
                uid:newUser.user.uid,
                email:inputs.email,
                fullName:inputs.fullName,
                username:inputs.userName,
                bio:"",
                profilePicURL:"",
                followers:[],
                following:[],
                posts:[],
                createdAt:Date.now(),
              }
            
            await setDoc(doc(firestore, "users", newUser.user.uid),UserDoc);
            localStorage.setItem("user-info",JSON.stringify(UserDoc))
            loginUser(UserDoc);
      }
     
    } catch(error){
      showToast("Error", error.message, "error")  
    }

   
}
return {loading,error,signup};
}

export default useSignInWithEmailAndPassword 

