import {PanelsTopLeft} from  'lucide-react'
import { IoMdHome, IoMdContract, IoMdSettings, IoMdMail, IoLogoWhatsapp } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'

const Sidebar = () => {
  const navLinks = [
    { icon: IoMdHome, label: 'Dashboard', path: '/' },
    { icon: IoMdContract, label: 'Contracts', path: '/contracts' },
    { icon: IoMdSettings, label: 'Settings', path: '/settings' },
  ]

  return (
     <div className="w-[200px] bg-[#6FB5BF] h-full rounded-e-2xl flex flex-col justify-between py-6">

      <div className="flex flex-col w-full px-4">
        <div className='flex items-center justify-between mb-8'>
            <h1 className="text-2xl font-bold text-white underline">Defellix</h1>
            <PanelsTopLeft className="text-white" size={24} />
        </div>
        
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.path}
                href={link.path}
                className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              >
                <Icon className="text-xl" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            )
          })}
        </nav>
     </div>
     
     <div className="flex flex-col items-center mx-4 mb-4 border-2 border-white/30 rounded-xl p-5 bg-white/10 backdrop-blur-sm">
       <div className="w-20 h-20 rounded-full bg-white border-4 border-white/50 overflow-hidden mb-3">
         <img 
           src="https://via.placeholder.com/80" 
           alt="Profile" 
           className="w-full h-full object-cover"
         />
       </div>
       <h3 className="text-white font-semibold text-sm mb-1.5">Alex Johnson</h3>
       <div className="flex items-center gap-1.5 text-white/80 text-xs mb-3">
         <MdLocationOn className="text-sm" />
         <span>New York, USA</span>
       </div>
       <div className="flex items-center gap-3">
         <a 
           href="mailto:alex@example.com" 
           className="text-white hover:text-white/80 transition-colors"
           aria-label="Email"
         >
           <IoMdMail className="text-lg" />
         </a>
         <a 
           href="https://wa.me/1234567890" 
           target="_blank" 
           rel="noopener noreferrer"
           className="text-white hover:text-white/80 transition-colors"
           aria-label="WhatsApp"
         >
           <IoLogoWhatsapp className="text-lg" />
         </a>
       </div>
     </div>
     </div>
  )
}

export default Sidebar