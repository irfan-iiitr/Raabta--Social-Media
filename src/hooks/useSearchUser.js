
import useShowToast from './useShowToast';
import { useState } from 'react';
import { where,query,collection,getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user,setUser] = useState(null);

    const showToast = useShowToast();

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser(null);
        try {
            const lowerCaseUsername = username.toLowerCase();
            const q = query(collection(firestore, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) return showToast("Error", "User not found", "error");
            let userDoc;
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();
            });

            setUser(userDoc);
            console.log(userDoc);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }
    return {isLoading,getUserProfile,user,setUser};
}

export default useSearchUser
