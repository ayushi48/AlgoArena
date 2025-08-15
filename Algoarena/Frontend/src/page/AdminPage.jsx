import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router'

const AdminPage = () => {
    const { user } = useSelector((state) => state.auth);
    return (

        <div className='h-full'>
            <div className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white shadow-md">

                <div className="flex items-center justify-between h-[10vh] px-6">
                    {/* Left: Navigation */}
                    {/* <div className="flex items-center gap-6"> */}
                    <NavLink to="/" className="uppercase text-lg font-semibold hover:underline hover:text-blue-300 transition">
                        Home
                    </NavLink>
                    <p className="uppercase text-2xl font-bold tracking-widest text-gray-300">Admin Dashboard</p>
                    {/* </div> */}

                    {/* Right: User Info */}
                    <div className="text-right">
                        <h1 className="text-xl font-semibold">Welcome, <span className='uppercase'>{user?.firstName || "Admin"}</span></h1>
                        <p className="text-sm text-gray-400">{user?.emailId}</p>
                    </div>
                </div>
            </div>
            <div className="h-full bg-slate-900 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {/* Delete Problem */}
                        <NavLink
                            to="/admin/delete"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-red-200 hover:border-red-400 border transition-all duration-300"
                        >
                            <span className="text-red-600 text-5xl mb-4">🗑️</span>
                            <h2 className="text-xl font-semibold text-gray-800">Delete Problem</h2>
                            <p className="text-sm text-gray-500 mt-1">Remove outdated or incorrect coding questions from the platform.</p>
                        </NavLink>

                        {/* Create Problem */}
                        <NavLink
                            to="/admin/create"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-green-200 hover:border-green-400 border transition-all duration-300"
                        >
                            <span className="text-green-600 text-5xl mb-4">📝</span>
                            <h2 className="text-xl font-semibold text-gray-800">Create Problem</h2>
                            <p className="text-sm text-gray-500 mt-1">Add new challenges with test cases and difficulty level for learners.</p>
                        </NavLink>

                        {/* Update Problem */}
                        <NavLink
                            to="/admin/update"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-yellow-200 hover:border-yellow-400 border transition-all duration-300"
                        >
                            <span className="text-yellow-500 text-5xl mb-4">✏️</span>
                            <h2 className="text-xl font-semibold text-gray-800">Update Problem</h2>
                            <p className="text-sm text-gray-500 mt-1">Modify existing problem details, tags, or difficulty levels.</p>
                        </NavLink>

                        {/* Add Admin */}
                        <NavLink
                            to="/admin/signup"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-blue-200 hover:border-blue-400 border transition-all duration-300"
                        >
                            <span className="text-blue-600 text-5xl mb-4">👤</span>
                            <h2 className="text-xl font-semibold text-gray-800">Add New Admin</h2>
                            <p className="text-sm text-gray-500 mt-1">Create admin accounts with role-based access controls and privileges.</p>
                        </NavLink>

                        {/* Delete User/Admin */}
                        <NavLink
                            to="/admin/delete/user"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-pink-200 hover:border-pink-400 border transition-all duration-300"
                        >
                            <span className="text-pink-600 text-5xl mb-4">🚫</span>
                            <h2 className="text-xl font-semibold text-gray-800">Remove User/Admin</h2>
                            <p className="text-sm text-gray-500 mt-1">Revoke access of users or inactive admins from the system.</p>
                        </NavLink>

                        {/* View Problem Stats */}
                        <NavLink
                            to="/coming"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-purple-200 hover:border-purple-400 border transition-all duration-300"
                        >
                            <span className="text-purple-600 text-5xl mb-4">📊</span>
                            <h2 className="text-xl font-semibold text-gray-800">Problem Analytics</h2>
                            <p className="text-sm text-gray-500 mt-1">Analyze question attempts, success rate, and most solved problems.</p>
                        </NavLink>

                        {/* Review Submissions */}
                        <NavLink
                            to="/coming"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-indigo-200 hover:border-indigo-400 border transition-all duration-300"
                        >
                            <span className="text-indigo-600 text-5xl mb-4">📥</span>
                            <h2 className="text-xl font-semibold text-gray-800">Review Submissions</h2>
                            <p className="text-sm text-gray-500 mt-1">View and moderate recent user submissions with code and results.</p>
                        </NavLink>

                        {/* Manage Tags */}
                        <NavLink
                            to="/coming"
                            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-emerald-200 hover:border-emerald-400 border transition-all duration-300"
                        >
                            <span className="text-emerald-600 text-5xl mb-4">🏷️</span>
                            <h2 className="text-xl font-semibold text-gray-800">Manage Tags</h2>
                            <p className="text-sm text-gray-500 mt-1">Organize tags for filtering problems by topic, difficulty, or skill.</p>
                        </NavLink>

                    </div>
                </div>
            </div>


        </div>

    )
}

export default AdminPage