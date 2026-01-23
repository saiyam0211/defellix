import { IoMdTrendingUp } from "react-icons/io";
import {Link} from "react-router-dom"


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
                        <button  className="cursor-pointer bg-teal-600 w-35  hover:bg-teal-700 text-white p-1! rounded-lg font-medium flex items-center gap-2">
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

                <div className="flex gap-5">

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-90 h-70 ml-10 ">
                        <div className="flex items-center justify-center  mb-4">

                            <h3 className="text-2xl  font-semibold text-gray-700  ">Reputation Score</h3>


                        </div>



                       
                        <div className="flex justify-center">
                            <div className="radial-progress text-teal-600 " style={{ "--value": `80`, "--size": "7rem", "--thickness": "10px" } /* as React.CSSProperties */} aria-valuenow={70} role="progressbar">
                                70%
                            </div>
                        </div>



                        <div className="text-center mt-5 ">
                            <p className="text-md font-medium  text-gray-900">Rising Talent</p>


                            <div className="flex justify-center mt-2">
                                <div className="flex items-center gap-1 bg-teal-200 px-2 rounded-xl">
                                    <IoMdTrendingUp className="text-teal-700" />
                                    <p className="text-[8px] font-bold  text-gray-700">5% growth</p>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6! w-[760px]">



                    </div>



                </div>

                <div className="p-6! ml-4">

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6!">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 ml-5">Recent Contracts</h3>
                           
                            <Link to="/myprofile"  className="text-sm font-bold text-white bg-teal-300 px-2 py-1 rounded-2xl mr-4"> View all</Link>

                        </div>

                        <div className="space-y-4!">

                            <div className="flex items-start gap-4 p-4! hover:bg-teal-50 rounded-lg cursor-pointer">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
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
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
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