import { FaRegStar } from "react-icons/fa6";
import { AiOutlineAim } from "react-icons/ai";




const Dashboard = () => {
    return (
        <div className="flex-1 bg-[#fbf9f1] flex flex-col h-screen overflow-y-scroll">
            <header className="bg-[#fbf9f1] px-8 py-9 w-full">
                <div className="flex justify-between items-center ml-2! mr-7!">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mt-3! ">Good Morning, Alex!</h1>
                        <p className="text-gray-600 mt-3">Here is what's happening with your projects today.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="cursor-pointer bg-teal-600 w-35  hover:bg-teal-700 text-white p-1! rounded-lg font-medium flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="9" y1="3" x2="9" y2="15" />
                                <line x1="3" y1="9" x2="15" y2="9" />
                            </svg>
                            New Contract
                        </button>

                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                            <span className="text-teal-700 font-medium text-sm">A</span>
                        </div>
                    </div>
                </div>
            </header>

       
            <main className="">

                <div className="flex gap-10">

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6! w-90 h-70 ">
                        <div className="flex items-center justify-between mb-4!">

                            <h3 className="text-sm font-semibold text-gray-700">Reputation Score</h3>
                            <FaRegStar className="text-teal-600 h-4 w-6" />

                        </div>
                        <div className="flex items-center justify-between mb-4 ">
                            <div className="relative w-12 h-12">
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl ml-12! font-bold text-gray-900">100</span>
                                </div>
                            </div>
                            <div className="text-center ">
                                <p className="text-sm font-medium  text-gray-900">Rising Talent</p>
                                <p className="text-xs text-gray-500 mt-1">Top 15% this month</p>
                            </div>
                        </div>

                    </div>

                  
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6! w-[500px]">
                       
                       
                   
                    </div>

                  
                 
                </div>

                <div className="p-6!">
                   
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6!">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Contracts</h3>
                           
                        </div>

                        <div className="space-y-4!">
                        
                            <div className="flex items-start gap-4 p-4! hover:bg-teal-50 rounded-lg cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                                        <path d="M6 6l-2 4 2 4M14 6l2 4-2 4M12 4l-4 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="flex-1 justify-between flex">
                                    <div>
                                       <h4 className="font-semibold text-gray-900 mb-1">E-Commerce React Frontend</h4>
                                       <p className="text-sm text-gray-600 mb-2">Client: Sarah Miller | Updated 2h ago</p>
                                    </div>
                                    <div className="flex items-center ">
                                        <div className="flex flex-col">
                                            <span className=" bg-green-100 w-10 px-9! flex justify-center py-2! text-green-700 text-xs font-medium rounded-full">Active</span>
                                            <span className="text-xs text-gray-500 mt-1!">Milestone 2/4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           
                            <div className="flex items-start gap-4 p-4! hover:bg-teal-50 rounded-lg cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                                        <path d="M6 6l-2 4 2 4M14 6l2 4-2 4M12 4l-4 12" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="flex-1 justify-between flex">
                                    <div>
                                       <h4 className="font-semibold text-gray-900 mb-1">E-Commerce React Frontend</h4>
                                       <p className="text-sm text-gray-600 mb-2">Client: Sarah Miller | Completed</p>
                                    </div>
                                    <div className="flex items-center ">
                                        <div className="flex flex-col">
                                            <span className=" bg-green-100 w-10 px-9! flex justify-center py-2! text-green-700 text-xs font-medium rounded-full">Closed</span>
                                            <span className="text-xs text-gray-500 mt-1!">Rating: 5.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                       
                            
                        </div>
                    </div>

                   
                     
                </div>
            </main>
        </div>

    )
}

export default Dashboard;