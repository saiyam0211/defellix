import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import ProfileSetStepper from './Pages/ProfileSetStepper'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/setup" element={<ProfileSetStepper />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  )
}

export default App
