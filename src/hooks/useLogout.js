import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useLogout = () => {
    const showToast = useShowToast();
    const logoutUser=useAuthStore((state)=>state.logout);
  
    const [signOut,loading,error]=useSignOut(auth);
    const handleLogout =async()=>{
       try{
              await signOut();
             logoutUser();
              localStorage.removeItem("user-info");
       }catch(e){ 
          showToast("Error",e.message,"error");
       }
    }


  return {handleLogout ,loading,error}
}

export default useLogout
