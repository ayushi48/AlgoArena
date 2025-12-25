// // import { useEffect, useState } from 'react';
// // import { NavLink, useNavigate } from 'react-router'; // Fixed import
// // import { useDispatch, useSelector } from 'react-redux';
// // import axiosClient from '../utils/axiosClient';
// // import { logoutUser } from '../authSlice';

// // function Home() {
// //     const dispatch = useDispatch();
// //     const { user } = useSelector((state) => state.auth);
// //     const [problems, setProblems] = useState([]);
// //     const [solvedProblems, setSolvedProblems] = useState([]);
// //     const [filters, setFilters] = useState({
// //         difficulty: 'all',
// //         tag: 'all',
// //         status: 'all'
// //     });
// //     const navigate = useNavigate();
// //     useEffect(() => {
// //         const fetchProblems = async () => {
// //             try {
// //                 const { data } = await axiosClient.get('/problem/getAllProblem');
// //                 setProblems(data);
// //             } catch (error) {
// //                 console.error('Error fetching problems:', error);
// //             }
// //         };

// //         const fetchSolvedProblems = async () => {
// //             try {
// //                 const { data } = await axiosClient.get('/problem/problemSolvedByUser');
// //                 setSolvedProblems(data);
// //             } catch (error) {
// //                 console.error('Error fetching solved problems:', error);
// //             }
// //         };
// //         fetchProblems();
// //         if (user) fetchSolvedProblems();
// //     }, [user]);

// //     const handleLogout = () => {
// //         dispatch(logoutUser());
// //         setSolvedProblems([]);
// //     };

// //     const filteredProblems = problems.filter(problem => {
// //         const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// //         const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
// //         const statusMatch = filters.status === 'all' || solvedProblems.some(sp => sp._id === problem._id);
// //         return difficultyMatch && tagMatch && statusMatch;
// //     });

// //     return (
// //         <div className="min-h-screen bg-base-200">
// //             {/* Navigation Bar */}
// //             <nav className="navbar bg-base-100 shadow-lg px-4">
// //                 <div className="flex-1">
// //                     <NavLink to="/" className="btn btn-ghost text-xl">Algoleague</NavLink>
// //                 </div>
// //                 <div className="flex justify-center items-center gap-4">
// //                     <div className="relative dropdown dropdown-end">
// //                         <div
// //                             tabIndex={0}
// //                             className="uppercase btn btn-ghost text-base font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150 px-4 py-2 rounded-md"
// //                         >
// //                             {user?.firstName || "User"}
// //                         </div>

// //                         <ul
// //                             tabIndex={0}
// //                             className="mt-2 p-2 dropdown-content menu bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 rounded-lg w-52 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
// //                         >
// //                             {user?.role === 'admin' && (
// //                                 <li>
// //                                     <NavLink to="/adminpage">Admin</NavLink>
// //                                 </li>
// //                             )}
// //                             <li>
// //                                     <NavLink to="/profile">Profile</NavLink>
// //                                 </li>
// //                             <li>
// //                                 <button
// //                                     onClick={handleLogout}
// //                                     className="w-full text-left py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
// //                                 >
// //                                     Logout
// //                                 </button>
// //                             </li>
// //                         </ul>
// //                     </div>

// //                 </div>

// //             </nav>

// //             {/* Main Content */}
// //             <div className="container mx-auto p-4">
// //                 {/* Filters */}
// //                 <div className="flex flex-wrap gap-4 mb-6">
// //                     {/* New Status Filter */}
// //                     <select
// //                         className="select select-bordered"
// //                         value={filters.status}
// //                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
// //                     >
// //                         <option value="all">All Problems</option>
// //                         <option value="solved">Solved Problems</option>
// //                     </select>

// //                     <select
// //                         className="select select-bordered"
// //                         value={filters.difficulty}
// //                         onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
// //                     >
// //                         <option value="all">All Difficulties</option>
// //                         <option value="easy">Easy</option>
// //                         <option value="medium">Medium</option>
// //                         <option value="hard">Hard</option>
// //                     </select>

// //                     <select
// //                         className="select select-bordered"
// //                         value={filters.tag}
// //                         onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
// //                     >
// //                         <option value="all">All Tags</option>
// //                         <option value="array">Array</option>
// //                         <option value="linkedlist">Linked List</option>
// //                         <option value="graph">Graph</option>
// //                         <option value="dp">DP</option>
// //                     </select>
// //                 </div>

// //                 {/* Problems List */}
// //                 <div className="grid gap-4">
// //                     {filteredProblems.map(problem => (
// //                         <div key={problem._id} className="card bg-base-100 shadow-xl">
// //                             <div className="card-body">
// //                                 <div className="flex items-center justify-between">
// //                                     <h2 className="card-title">
// //                                         <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
// //                                             {problem.title}
// //                                         </NavLink>
// //                                     </h2>
// //                                     {solvedProblems.some(sp => sp._id === problem._id) && (
// //                                         <div className="badge badge-success gap-2">
// //                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
// //                                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
// //                                             </svg>
// //                                             Solved
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                                 <div className="flex gap-2">
// //                                     <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
// //                                         {problem.difficulty}
// //                                     </div>
// //                                     <div className="badge badge-info">
// //                                         {problem.tags}
// //                                     </div>
// //                                 </div>

// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // const getDifficultyBadgeColor = (difficulty) => {
// //     switch (difficulty.toLowerCase()) {
// //         case 'easy': return 'badge-success';
// //         case 'medium': return 'badge-warning';
// //         case 'hard': return 'badge-error';
// //         default: return 'badge-neutral';
// //     }
// // };

// // export default Home;

// // import { useEffect, useState } from 'react';
// // import { NavLink, useNavigate } from 'react-router';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axiosClient from '../utils/axiosClient';
// // import { logoutUser } from '../authSlice';

// // function Home() {
// //     const dispatch = useDispatch();
// //     const { user } = useSelector((state) => state.auth);
// //     const [problems, setProblems] = useState([]);
// //     const [solvedProblems, setSolvedProblems] = useState([]);
// //     const [filters, setFilters] = useState({
// //         difficulty: 'all',
// //         tag: 'all',
// //         status: 'all'
// //     });
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchProblems = async () => {
// //             try {
// //                 const { data } = await axiosClient.get('/problem/getAllProblem');
// //                 setProblems(data);
// //             } catch (error) {
// //                 console.error('Error fetching problems:', error);
// //             }
// //         };

// //         const fetchSolvedProblems = async () => {
// //             try {
// //                 const { data } = await axiosClient.get('/problem/problemSolvedByUser');
// //                 setSolvedProblems(data);
// //             } catch (error) {
// //                 console.error('Error fetching solved problems:', error);
// //             }
// //         };

// //         fetchProblems();
// //         if (user) fetchSolvedProblems();
// //     }, [user]);

// //     const handleLogout = () => {
// //         dispatch(logoutUser());
// //         setSolvedProblems([]);
// //     };

// //     const filteredProblems = problems.filter(problem => {
// //         const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
// //         const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
// //         const statusMatch =
// //             filters.status === 'all' ||
// //             solvedProblems.some(sp => sp._id === problem._id);

// //         return difficultyMatch && tagMatch && statusMatch;
// //     });

// //     return (
// //         <div className="min-h-screen bg-[#0f172a] text-gray-200">
// //             {/* NAVBAR */}
// //             <nav className="sticky top-0 z-50 bg-[#020617] border-b border-gray-800">
// //                 <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
// //                     <NavLink to="/" className="text-xl font-bold tracking-wide text-primary">
// //                         AlgoLeague
// //                     </NavLink>
// // {/* 
// //                     <div className="dropdown dropdown-end">

// //                         <div
// //                             tabIndex={0}
// //                             className="cursor-pointer px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
// //                         >
// //                             {user?.firstName || "User"}
// //                         </div>

// //                         <ul
// //                             tabIndex={0}
// //                             className="dropdown-content mt-3 p-2 w-48 rounded-xl bg-[#020617] border border-gray-800 shadow-xl"
// //                         >
// //                             {user?.role === 'admin' && (
// //                                 <li>
// //                                     <NavLink className="hover:bg-gray-800 rounded-lg" to="/adminpage">
// //                                         Admin
// //                                     </NavLink>
// //                                 </li>
// //                             )}
// //                             <li>
// //                                 <NavLink className="hover:bg-gray-800 rounded-lg" to="/profile">
// //                                     Profile
// //                                 </NavLink>
// //                             </li>
// //                             <li>
// //                                 <button
// //                                     onClick={handleLogout}
// //                                     className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-400"
// //                                 >
// //                                     Logout
// //                                 </button>
// //                             </li>
// //                         </ul>
// //                     </div> */}
// //                     <div className="dropdown dropdown-end">
// //     {/* Trigger */}
// //     <div
// //         tabIndex={0}
// //         className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-xl hover:bg-gray-800 transition"
// //     >
// //         {/* Avatar */}
// //         <div className="relative">
// //             <img
// //                 src="https://ui-avatars.com/api/?name=${user?.firstName || 'User'}&background=6366f1&color=fff"
// //                 alt="profile"
// //                 className="w-10 h-10 rounded-full object-cover"
// //             />
// //             <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#020617] rounded-full" />
// //         </div>

// //         {/* Name + Subtitle */}
// //         <div className="leading-tight">
// //             <p className="text-sm font-semibold text-white">
// //                 {user?.firstName || "User"} {user?.lastName}
// //             </p>
// //             <p className="text-xs text-gray-400">
// //                 Edit your profile
// //             </p>
// //         </div>
// //     </div>

// //     {/* Dropdown Menu */}
// //     <ul
// //         tabIndex={0}
// //         className="dropdown-content mt-3 p-2 w-56 rounded-xl bg-[#020617] border border-gray-800 shadow-xl"
// //     >
// //         {user?.role === 'admin' && (
// //             <li>
// //                 <NavLink
// //                     to="/adminpage"
// //                     className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800"
// //                 >
// //                     Admin
// //                 </NavLink>
// //             </li>
// //         )}

// //         <li>
// //             <NavLink
// //                 to="/profile"
// //                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800"
// //             >
// //                 Profile
// //             </NavLink>
// //         </li>

// //         <div className="my-1 border-t border-gray-800" />

// //         <li>
// //             <button
// //                 onClick={handleLogout}
// //                 className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400"
// //             >
// //                 Logout
// //             </button>
// //         </li>
// //     </ul>
// // </div>

// //                 </div>
// //             </nav>

// //             {/* CONTENT */}
// //             <div className="max-w-7xl mx-auto px-6 py-8">
// //                 {/* FILTERS */}
// //                 <div className="flex flex-wrap gap-4 mb-6">
// //                     <select
// //                         className="select select-bordered bg-[#020617] border-gray-800"
// //                         value={filters.status}
// //                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
// //                     >
// //                         <option value="all">All Problems</option>
// //                         <option value="solved">Solved</option>
// //                     </select>

// //                     <select
// //                         className="select select-bordered bg-[#020617] border-gray-800"
// //                         value={filters.difficulty}
// //                         onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
// //                     >
// //                         <option value="all">All Difficulty</option>
// //                         <option value="easy">Easy</option>
// //                         <option value="medium">Medium</option>
// //                         <option value="hard">Hard</option>
// //                     </select>

// //                     <select
// //                         className="select select-bordered bg-[#020617] border-gray-800"
// //                         value={filters.tag}
// //                         onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
// //                     >
// //                         <option value="all">All Tags</option>
// //                         <option value="array">Array</option>
// //                         <option value="linkedlist">Linked List</option>
// //                         <option value="graph">Graph</option>
// //                         <option value="dp">DP</option>
// //                     </select>
// //                 </div>

// //                 {/* PROBLEM LIST */}
// //                 <div className="space-y-3">
// //                     {filteredProblems.map(problem => (
// //                         <div
// //                             key={problem._id}
// //                             className="flex items-center justify-between p-4 rounded-xl bg-[#020617] border border-gray-800 hover:border-primary/40 hover:shadow-lg transition"
// //                         >
// //                             <div>
// //                                 <NavLink
// //                                     to={`/problem/${problem._id}`}
// //                                     className="text-lg font-medium hover:text-primary transition"
// //                                 >
// //                                     {problem.title}
// //                                 </NavLink>

// //                                 <div className="flex gap-2 mt-2">
// //                                     <span className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
// //                                         {problem.difficulty}
// //                                     </span>
// //                                     <span className="badge badge-outline text-blue-400 border-blue-400">
// //                                         {problem.tags}
// //                                     </span>
// //                                 </div>
// //                             </div>

// //                             {solvedProblems.some(sp => sp._id === problem._id) && (
// //                                 <span className="badge badge-success px-4 py-3">
// //                                     ✓ Solved
// //                                 </span>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // const getDifficultyBadgeColor = (difficulty) => {
// //     switch (difficulty.toLowerCase()) {
// //         case 'easy': return 'badge-success';
// //         case 'medium': return 'badge-warning';
// //         case 'hard': return 'badge-error';
// //         default: return 'badge-neutral';
// //     }
// // };

// // export default Home;
// import { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Home() {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.auth);
//     const [problems, setProblems] = useState([]);
//     const [solvedProblems, setSolvedProblems] = useState([]);
//     const [filters, setFilters] = useState({
//         difficulty: 'all',
//         tag: 'all',
//         status: 'all'
//     });
//     const navigate = useNavigate();
//     const handleResetFilters = () => {
//         setFilters({
//             difficulty: 'all',
//             tag: 'all',
//             status: 'all'
//         });
//     };

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const { data } = await axiosClient.get('/problem/getAllProblem');
//                 setProblems(data);
//             } catch (error) {
//                 console.error('Error fetching problems:', error);
//             }
//         };

//         const fetchSolvedProblems = async () => {
//             try {
//                 const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//                 setSolvedProblems(data);
//             } catch (error) {
//                 console.error('Error fetching solved problems:', error);
//             }
//         };

//         fetchProblems();
//         if (user) fetchSolvedProblems();
//     }, [user]);

//     const handleLogout = () => {
//         dispatch(logoutUser());
//         setSolvedProblems([]);
//     };

//     const filteredProblems = problems.filter(problem => {
//         const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//         const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//         const statusMatch =
//             filters.status === 'all' ||
//             solvedProblems.some(sp => sp._id === problem._id);
//         return difficultyMatch && tagMatch && statusMatch;
//     });

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-gray-200">
//             {/* NAVBAR */}
//             <nav className="sticky top-0 z-50 bg-[#020617] border-b border-gray-800">
//                 <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//                     <NavLink to="/" className="text-xl font-bold text-indigo-400">
//                         AlgoLeague
//                     </NavLink>

//                     {/* PROFILE */}
//                     <div className="dropdown dropdown-end">
//                         <div tabIndex={0} className="flex items-center gap-3 cursor-pointer">
//                             <img
//                                 src={`https://ui-avatars.com/api/?name=${user?.firstName || 'User'}&background=6366f1&color=fff`}
//                                 className="w-9 h-9 rounded-full"
//                             />
//                             <div>
//                                 <p className="text-sm font-semibold">{user?.firstName}</p>
//                                 <p className="text-xs text-gray-400">Edit profile</p>
//                             </div>
//                         </div>

//                         <ul tabIndex={0} className="dropdown-content mt-3 w-48 rounded-xl bg-[#020617] border border-gray-800 shadow-xl">
//                             {user?.role === 'admin' && (
//                                 <li>
//                                     <NavLink to="/adminpage" className="px-4 py-2 hover:bg-gray-800 block">
//                                         Admin
//                                     </NavLink>
//                                 </li>
//                             )}
//                             <li>
//                                 <NavLink to="/profile" className="px-4 py-2 hover:bg-gray-800 block">
//                                     Profile
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="px-4 py-2 w-full text-left hover:bg-red-500/10 text-red-400"
//                                 >
//                                     Logout
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>

//             {/* MAIN CONTENT */}
//             <div className="max-w-7xl mx-auto px-6 py-6">
//                 {/* FILTER BAR */}
//                 <div className="flex flex-wrap items-center gap-4 mb-6">
//                     <select
//                         className="select select-sm bg-[#020617] border-gray-800"
//                         value={filters.status}
//                         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                     >
//                         <option value="all">All Problems</option>
//                         <option value="solved">Solved</option>
//                     </select>

//                     <select
//                         className="select select-sm bg-[#020617] border-gray-800"
//                         value={filters.difficulty}
//                         onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
//                     >
//                         <option value="all">Difficulty</option>
//                         <option value="easy">Easy</option>
//                         <option value="medium">Medium</option>
//                         <option value="hard">Hard</option>
//                     </select>

//                     <select
//                         className="select select-sm bg-[#020617] border-gray-800"
//                         value={filters.tag}
//                         onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//                     >
//                         <option value="all">Tags</option>
//                         <option value="array">Array</option>
//                         <option value="linkedlist">Linked List</option>
//                         <option value="graph">Graph</option>
//                         <option value="dp">DP</option>
//                     </select>

//                     {/* RESET BUTTON */}
//                     <button
//                         onClick={handleResetFilters}
//                         className="btn btn-sm btn-ghost text-gray-400 hover:text-white hover:bg-gray-800"
//                     >
//                         Reset
//                     </button>
//                 </div>


//                 {/* TABLE HEADER */}
//                 <div className="grid grid-cols-12 px-4 py-2 text-xs text-gray-400 border-b border-gray-800">
//                     <div className="col-span-1">Status</div>
//                     <div className="col-span-6">Title</div>
//                     <div className="col-span-3">Tags</div>
//                     <div className="col-span-2 text-right">Difficulty</div>
//                 </div>

//                 {/* PROBLEM ROWS */}
//                 <div className="divide-y divide-gray-800">
//                     {filteredProblems.map(problem => {
//                         const solved = solvedProblems.some(sp => sp._id === problem._id);

//                         return (
//                             <div
//                                 key={problem._id}
//                                 className="grid grid-cols-12 px-4 py-3 hover:bg-[#020617] transition"
//                             >
//                                 <div className="col-span-1">
//                                     {solved && <span className="text-green-400">✔</span>}
//                                 </div>

//                                 <div className="col-span-6">
//                                     <NavLink
//                                         to={`/problem/${problem._id}`}
//                                         className="hover:text-indigo-400"
//                                     >
//                                         {problem.title}
//                                     </NavLink>
//                                 </div>

//                                 <div className="col-span-3">
//                                     <span className="badge badge-outline text-blue-400 border-blue-400">
//                                         {problem.tags}
//                                     </span>
//                                 </div>

//                                 <div className={`col-span-2 text-right ${getDifficultyText(problem.difficulty)}`}>
//                                     {problem.difficulty}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const getDifficultyText = (difficulty) => {
//     switch (difficulty.toLowerCase()) {
//         case 'easy': return 'text-green-400';
//         case 'medium': return 'text-yellow-400';
//         case 'hard': return 'text-red-400';
//         default: return 'text-gray-400';
//     }
// };

// export default Home;
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';

function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all'
    });
    const navigate = useNavigate();

    const handleResetFilters = () => {
        setFilters({
            difficulty: 'all',
            tag: 'all',
            status: 'all'
        });
    };

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const { data } = await axiosClient.get('/problem/getAllProblem');
                setProblems(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        const fetchSolvedProblems = async () => {
            try {
                const { data } = await axiosClient.get('/problem/problemSolvedByUser');
                setSolvedProblems(data);
            } catch (error) {
                console.error('Error fetching solved problems:', error);
            }
        };

        fetchProblems();
        if (user) fetchSolvedProblems();
    }, [user]);

    const handleLogout = () => {
        dispatch(logoutUser());
        setSolvedProblems([]);
    };

    const filteredProblems = problems.filter(problem => {
        const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
        const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
        const statusMatch =
            filters.status === 'all' ||
            solvedProblems.some(sp => sp._id === problem._id);
        return difficultyMatch && tagMatch && statusMatch;
    });

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200">
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-[#020617] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <NavLink to="/" className="text-xl font-bold tracking-wide text-indigo-400">
                        AlgoLeague
                    </NavLink>

                    {/* PROFILE */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="flex items-center gap-3 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-800 transition"
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.firstName || 'User'}&background=6366f1&color=fff`}
                                className="w-9 h-9 rounded-full"
                            />
                            <div className="leading-tight">
                                <p className="text-sm font-semibold">{user?.firstName}</p>
                                <p className="text-xs text-gray-400">Edit profile</p>
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content mt-3 w-48 rounded-xl bg-[#020617] border border-gray-800 shadow-xl"
                        >
                            {user?.role === 'admin' && (
                                <li>
                                    <NavLink to="/adminpage" className="px-4 py-2 block hover:bg-gray-800">
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/profile" className="px-4 py-2 block hover:bg-gray-800">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 w-full text-left hover:bg-red-500/10 text-red-400"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* FILTER BAR */}
                <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#020617] border border-gray-800 rounded-xl p-4">
                    <select
                        className="select select-sm bg-[#0f172a] border-gray-700"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="all">All Problems</option>
                        <option value="solved">Solved</option>
                    </select>

                    <select
                        className="select select-sm bg-[#0f172a] border-gray-700"
                        value={filters.difficulty}
                        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    >
                        <option value="all">Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <select
                        className="select select-sm bg-[#0f172a] border-gray-700"
                        value={filters.tag}
                        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                    >
                        <option value="all">Tags</option>
                        <option value="array">Array</option>
                        <option value="linkedlist">Linked List</option>
                        <option value="graph">Graph</option>
                        <option value="dp">DP</option>
                    </select>

                    <button
                        onClick={handleResetFilters}
                        className="btn btn-sm btn-ghost text-gray-400 hover:text-white hover:bg-gray-800 ml-auto"
                    >
                        Reset
                    </button>
                </div>

                {/* TABLE HEADER */}
                <div className="grid grid-cols-12 px-4 py-2 text-xs text-gray-400 border-b border-gray-800">
                    <div className="col-span-1">Status</div>
                    <div className="col-span-6">Title</div>
                    <div className="col-span-3">Tags</div>
                    <div className="col-span-2 text-right">Difficulty</div>
                </div>

                {/* PROBLEM ROWS */}
                <div className="divide-y divide-gray-800">
                    {filteredProblems.map(problem => {
                        const solved = solvedProblems.some(sp => sp._id === problem._id);

                        return (
                            <div
                                key={problem._id}
                                className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-[#020617] transition"
                            >
                                <div className="col-span-1">
                                    {solved && <span className="text-green-400">✔</span>}
                                </div>

                                <div className="col-span-6">
                                    <NavLink
                                        to={`/problem/${problem._id}`}
                                        className="hover:text-indigo-400 uppercase"
                                    >
                                        {problem.title}
                                    </NavLink>
                                </div>

                                <div className="col-span-3">
                                    <span className="badge badge-outline text-blue-400 border-blue-400 uppercase">
                                        {problem.tags}
                                    </span>
                                </div>

                                <div className={ ` uppercase col-span-2 text-right ${getDifficultyText(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const getDifficultyText = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'text-green-400';
        case 'medium': return 'text-yellow-400';
        case 'hard': return 'text-red-400';
        default: return 'text-gray-400';
    }
};

export default Home;
