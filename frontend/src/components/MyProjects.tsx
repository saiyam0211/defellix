const MyProjects = () => {
    const projects = [
        {
            id: 'WR',
            name: 'Website Redesign',
            client: 'Acme Corp.',
            initDate: 'Oct 24, 2023',
            deadline: 'Nov 15, 2023',
            progress: 65,
            color: 'bg-blue-500'
        },
        {
            id: 'MA',
            name: 'Mobile App MVP',
            client: 'TechStart Inc.',
            initDate: 'Nov 01, 2023',
            deadline: 'Dec 20, 2023',
            progress: 30,
            color: 'bg-blue-500'
        },
        {
            id: 'BD',
            name: 'Brand Design System',
            client: 'Globex Ltd',
            initDate: 'Sep 12, 2023',
            deadline: 'Oct 30, 2023',
            progress: 98,
            color: 'bg-emerald-500'
        },
        {
            id: 'MP',
            name: 'Marketing Portal',
            client: 'Soylent Corp',
            initDate: 'Nov 05, 2023',
            deadline: 'Jan 15, 2024',
            progress: 15,
            color: 'bg-blue-500'
        }
    ]
    return (
        <div className="bg-[#fbf9f1] h-full">
            <div className="p-10 ">
                <h1 className="text-4xl font-bold  text-gray-900">My Projects</h1>
                <h3 className="mt-4  text-gray-600"> Manage and track your active client work</h3>
            </div>
            <div className="flex justify-between">
                <div className="px-10 flex gap-6 text-gray-900">
                    <button>Active</button>
                    <button>Completed</button>
                    <button>Drafts</button>

                </div>
                <div className="mr-10 ">
                    <button className="bg-teal-600 p-2 rounded-md flex gap-2 ">
                        <svg className="mt-1" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="9" y1="3" x2="9" y2="15" />
                            <line x1="3" y1="9" x2="15" y2="9" />
                        </svg>
                        New Project
                    </button>
                </div>
            </div>

            <div>
                <hr className="w-315 ml-10 mt-3 text-gray-600" />
            </div>


            <div className="overflow-x-auto mt-3 border">
                <table className="w-315 ml-10 rounded-2xl overflow-hidden">
                    <thead>
                        <tr className="bg-gray-300 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Project Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Client / Company
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Init Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Deadline
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                Progress
                            </th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-gray-100">
                        {projects.map((project, index) => (
                            <tr key={index} className="hover:bg-teal-100 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-500">
                                            {project.id}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {project.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm text-gray-600">{project.client}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm text-gray-600">{project.initDate}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm text-gray-600">{project.deadline}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                            <div
                                                className={`h-2 rounded-full ${project.color} transition-all duration-300`}
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 min-w-[3rem]">
                                            {project.progress}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>



                </table>
            </div>


        </div>



    )
}
export default MyProjects;
