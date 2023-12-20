import {create} from "zustand"

const useAuthStore =create((set)=>({
    user:JSON.parse(localStorage.getItem("user-info"))|| null,
    login:(user)=>set({user}),
    logout:(user)=>set({user:null}),
    setUser:(user)=>set({user})
}))

export default useAuthStore;