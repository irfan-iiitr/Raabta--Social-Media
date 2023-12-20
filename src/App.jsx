import { Button } from "@chakra-ui/react"
import { Navigate, Route, Router, Routes } from "react-router-dom"
import HomePage from "./components/pages/HomePage/HomePage"
import AuthPage from "./components/pages/AuthPage/AuthPage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import ProfilePage from "./components/pages/ProfilePage/ProfilePage"
import useAuthStore from "./store/authStore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase/firebase"
function App() {
  
  const [authUser]=useAuthState(auth);

  return (
    
    <PageLayout>
      <Routes>
        <Route path="/" element={authUser?<HomePage></HomePage>:<Navigate to={"/auth"}></Navigate>}></Route>
        <Route path="/auth" element={!authUser?<AuthPage></AuthPage>:<Navigate to={"/"}></Navigate>}></Route>
        <Route path="/:username" element={<ProfilePage></ProfilePage>}></Route>
      </Routes>
    </PageLayout>
  )
}

export default App
