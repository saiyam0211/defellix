import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { MdLocationOn,  MdCalendarToday, MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaTh, FaFileAlt, FaStar } from 'react-icons/fa'
import { X, Globe as GlobeIcon, Github, Calendar, Users } from 'lucide-react'

interface Project {
    id: number;
    name: string;
    role: string;
    liveLink: string;
    duration: string;
    teamSize: string;
    techStack: string[];
    summary: string;
    highlights: string[];
    images: string[];
    githubLink: string;
}

function Profile() {
    const [activeTab, setActiveTab] = useState('Projects')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
    
    // Load data from localStorage or use defaults
    const [user, setUser] = useState({
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
        githubLink: "",
        linkedinLink: "https://linkedin.com/in/alex-morgan",
        portfolioLink: "https://alexmorgan.design",
        instagramLink: "https://instagram.com/alexmorgan",
        stats: {
            projects: 0,
            files: 134,
            teammates: 18
        },
        projects: [] as Project[],
        availability: [
            "Available for design reviews on Tue & Thu",
            "Prefers async feedback via comments",
            "Best contact: Slack or in-app messages"
        ]
    })

    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            try {
                const profileData = JSON.parse(savedProfile);
                setUser({
                    name: profileData.fullName || user.name,
                    photo: profileData.profilePicture || user.photo,
                    headline: profileData.role || user.headline,
                    role: profileData.role || user.role,
                    bio: profileData.shortBio || user.bio,
                    location: profileData.location || user.location,
                    email: profileData.workEmail || user.email,
                    profileUrl: profileData.profileUrl || user.profileUrl,
                    company: profileData.organization || user.company,
                    joinedDate: profileData.joined || user.joinedDate,
                    timezone: profileData.timezone || user.timezone,
                    workingHours: profileData.workingHours || user.workingHours,
                    experience: user.experience,
                    skills: profileData.topSkills || user.skills,
                    githubLink: profileData.projects?.[0]?.githubLink || "",
                    linkedinLink: profileData.linkedinUrl ? `https://linkedin.com${profileData.linkedinUrl}` : user.linkedinLink,
                    portfolioLink: profileData.website ? `https://${profileData.website}` : user.portfolioLink,
                    instagramLink: user.instagramLink,
                    stats: {
                        projects: profileData.projects?.length || 0,
                        files: user.stats.files,
                        teammates: user.stats.teammates
                    },
                    projects: profileData.projects || [],
                    availability: profileData.preferredCollaboration || user.availability
                });
            } catch (error) {
                console.error('Error parsing profile data:', error);
            }
        }
    }, [])

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
                                                <span>{user.githubLink.replace('https://github.com/', '') || user.githubLink}</span>
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
                                
                                {/* Projects List */}
                                <div className="space-y-4">
                                    {user.projects.length > 0 ? (
                                        user.projects.map((project, index) => (
                                            <div 
                                                key={project.id || index} 
                                                onClick={() => {
                                                    setSelectedProject(project);
                                                    setIsProjectModalOpen(true);
                                                }}
                                                className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <FaStar className="text-gray-600" size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            {project.role} • {project.duration} • {project.teamSize}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-8">No projects added yet.</p>
                                    )}
                                </div>
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

            {/* Project Detail Modal */}
            {isProjectModalOpen && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                            <h3 className="text-2xl font-semibold text-gray-900">{selectedProject.name}</h3>
                            <button
                                onClick={() => setIsProjectModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Project Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Your Role</p>
                                    <p className="text-gray-900 font-medium">{selectedProject.role}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Duration</p>
                                    <p className="text-gray-900 font-medium">{selectedProject.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Team Size</p>
                                    <p className="text-gray-900 font-medium">{selectedProject.teamSize}</p>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex gap-4">
                                {selectedProject.liveLink && (
                                    <a 
                                        href={selectedProject.liveLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                                    >
                                        <GlobeIcon className="w-4 h-4" />
                                        <span>Live Link</span>
                                    </a>
                                )}
                                {selectedProject.githubLink && (
                                    <a 
                                        href={selectedProject.githubLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>GitHub</span>
                                    </a>
                                )}
                            </div>

                            {/* Tech Stack */}
                            {selectedProject.techStack.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">Technologies/tech Stack used</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Project Summary */}
                            {selectedProject.summary && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Project Summary</p>
                                    <p className="text-gray-600 leading-relaxed">{selectedProject.summary}</p>
                                </div>
                            )}

                            {/* Key Highlights */}
                            {selectedProject.highlights.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Key Highlights & Outcomes</p>
                                    <ul className="space-y-2">
                                        {selectedProject.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-600">
                                                <span className="text-teal-600 mt-1">•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Project Images */}
                            {selectedProject.images.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Project Images</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        {selectedProject.images.map((image, index) => (
                                            <img 
                                                key={index} 
                                                src={image} 
                                                alt={`${selectedProject.name} ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                </div>    
                </div>
                </div>
            )}
        </div>
    )
}

export default Profile




