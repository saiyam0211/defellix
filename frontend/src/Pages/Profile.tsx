import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { MdLocationOn, MdBusiness, MdCalendarToday, MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaTh, FaFileAlt, FaStar } from 'react-icons/fa'
import { IoChatbubbleOutline } from 'react-icons/io5'

function Profile() {
    const [activeTab, setActiveTab] = useState('Projects')
    
    const user = {
        name: "Alex Morgan",
        photo: "https://via.placeholder.com/120",
        headline: "Product Designer",
        role: "Product Designer",
        bio: "Designing scalable systems and thoughtful interfaces for fast-growing product teams.",
        location: "San Francisco, CA",
        email: "alex.morgan@example.com",
        profileUrl: "nexgen.app/alexmorgan",
        company: "NexGen Studio",
        joinedDate: "Jan 2022",
        timezone: "PST (UTC-8)",
        workingHours: "9am - 5pm",
        experience: "5+ years",
        skills: ["Design systems", "Product thinking", "Prototyping", "User research"],
        githubLink: "https://github.com/alexmorgan",
        linkedinLink: "https://linkedin.com/in/alex-morgan",
        portfolioLink: "https://alexmorgan.design",
        instagramLink: "https://instagram.com/alexmorgan",
        stats: {
            projects: 24,
            files: 134,
            teammates: 18
        },
        projects: [
            { name: "NexGen Design System", icon: FaStar, updated: "2 days ago", details: "48 components", role: "Owner" },
            { name: "Analytics Workspace", icon: FaTh, updated: "5 days ago", details: "Marketing", role: "Contributor" },
            { name: "Customer Portal", icon: FaFileAlt, updated: "1 week ago", details: "CX", role: "Reviewer" }
        ],
        availability: [
            "Available for design reviews on Tue & Thu",
            "Prefers async feedback via comments",
            "Best contact: Slack or in-app messages"
        ]
    }

    return (
        <div className="flex h-screen w-full bg-[#fbf9f1]">
            <Sidebar />
            
            <div className="flex-1 overflow-y-auto scrBar bg-gray-50">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                            <div className="flex items-start gap-6 flex-1">
                                <img 
                                    src={user.photo} 
                                    alt={user.name}
                                    className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-2 border-gray-200"
                                />
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{user.name}</h1>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <MdLocationOn className="text-gray-400" size={18} />
                                            <span>{user.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MdCalendarToday className="text-gray-400" size={18} />
                                            <span>Joined {user.joinedDate}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-2xl">
                                        {user.bio}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-4">
                                <div className="flex gap-6 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{user.stats.projects}</div>
                                        <div className="text-xs text-gray-500">projects</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{user.stats.files}</div>
                                        <div className="text-xs text-gray-500">files</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{user.stats.teammates}</div>
                                        <div className="text-xs text-gray-500">teammates</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        <div className="lg:col-span-1 space-y-6">
                
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">About</h2>
                                <p className="text-sm text-gray-500 mb-4">Basic details</p>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MdEmail className="text-gray-400" size={16} />
                                        <span className="text-gray-600">{user.email}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <span className="text-gray-500">Role: </span>
                                        {user.role}
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <span className="text-gray-500">Working hours: </span>
                                        {user.workingHours}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <span className="text-gray-500">Experience: </span>
                                        {user.experience}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Links</h3>
                                    <div className="space-y-2">
                                        {user.portfolioLink && (
                                            <a href={user.portfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors">
                                                <FaGlobe className="text-gray-400" size={14} />
                                                <span>{user.portfolioLink.replace('https://', '')}</span>
                                            </a>
                                        )}
                                        {user.linkedinLink && (
                                            <a href={user.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors">
                                                <FaLinkedin className="text-gray-400" size={14} />
                                                <span>{user.linkedinLink.replace('https://linkedin.com/in/', '/')}</span>
                                            </a>
                                        )}
                                        {user.instagramLink && (
                                            <a href={user.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors">
                                                <FaInstagram className="text-gray-400" size={14} />
                                                <span>{user.instagramLink.replace('https://instagram.com/', '@')}</span>
                                            </a>
                                        )}
                                        {user.githubLink && (
                                            <a href={user.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors">
                                                <FaGithub className="text-gray-400" size={14} />
                                                <span>{user.githubLink.replace('https://github.com/', '')}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Skills</h2>
                                <p className="text-sm text-gray-500 mb-4">Top strengths</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Work Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Work</h2>
                                <p className="text-sm text-gray-500 mb-4">Recent projects and activity</p>
                                
                                {/* Tabs */}
                                <div className="flex gap-1 border-b border-gray-200 mb-4">
                                    {['Projects', 'Activity', 'Files'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                                activeTab === tab
                                                    ? 'text-teal-600 border-b-2 border-teal-600'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Projects List */}
                                {activeTab === 'Projects' && (
                                    <div className="space-y-4">
                                        {user.projects.map((project, index) => {
                                            const Icon = project.icon
                                            return (
                                                <div key={index} className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <div className="flex items-start gap-3 flex-1">
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                            <Icon className="text-gray-600" size={20} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                                                            <p className="text-sm text-gray-500">
                                                                Updated {project.updated} - {project.details}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500 font-medium">{project.role}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Availability Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Availability</h2>
                                <p className="text-sm text-gray-500 mb-4">Collaboration preferences</p>
                                
                                <ul className="space-y-2">
                                    {user.availability.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="text-gray-400 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile




