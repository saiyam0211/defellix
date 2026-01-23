import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Myprofile from './components/MyProfile'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
