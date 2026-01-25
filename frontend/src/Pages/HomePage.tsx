import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import Myprojects from '@/components/MyProjects'
import { Route, Routes } from 'react-router-dom'

function HomePage() {
  return (
    <div className="flex h-screen w-full bg-[#fbf9f1]">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Myprojects />} />
        </Routes>
      </div>
    </div>
  )
}

export default HomePage