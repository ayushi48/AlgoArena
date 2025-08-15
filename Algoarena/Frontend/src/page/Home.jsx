import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router'; // Fixed import
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
        const statusMatch = filters.status === 'all' || solvedProblems.some(sp => sp._id === problem._id);
        return difficultyMatch && tagMatch && statusMatch;
    });

    return (
        <div className="min-h-screen bg-base-200">
            {/* Navigation Bar */}
            <nav className="navbar bg-base-100 shadow-lg px-4">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost text-xl">Practice Question</NavLink>
                </div>
                <div className="flex justify-center items-center gap-4">
                    {/* Admin Label */}
                    {/* <div
                        onClick={() => navigate('/admin')}
                        className="btn btn-ghost uppercase">
                        Admin
                    </div> */}

                    {/* User Dropdown */}
                    <div className="relative dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="uppercase btn btn-ghost text-base font-medium text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150 px-4 py-2 rounded-md"
                        >
                            {user?.firstName || "User"}
                        </div>

                        <ul
                            tabIndex={0}
                            className="mt-2 p-2 dropdown-content menu bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 rounded-lg w-52 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
                        >
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Logout
                                </button>
                            </li>
                            {user?.role === 'admin' && (
                                <li>
                                    <NavLink to="/adminpage">Admin</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>

            </nav>

            {/* Main Content */}
            <div className="container mx-auto p-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* New Status Filter */}
                    <select
                        className="select select-bordered"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="all">All Problems</option>
                        <option value="solved">Solved Problems</option>
                    </select>

                    <select
                        className="select select-bordered"
                        value={filters.difficulty}
                        onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <select
                        className="select select-bordered"
                        value={filters.tag}
                        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                    >
                        <option value="all">All Tags</option>
                        <option value="array">Array</option>
                        <option value="linkedlist">Linked List</option>
                        <option value="graph">Graph</option>
                        <option value="dp">DP</option>
                    </select>
                </div>

                {/* Problems List */}
                <div className="grid gap-4">
                    {filteredProblems.map(problem => (
                        <div key={problem._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <h2 className="card-title">
                                        <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
                                            {problem.title}
                                        </NavLink>
                                    </h2>
                                    {solvedProblems.some(sp => sp._id === problem._id) && (
                                        <div className="badge badge-success gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Solved
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </div>
                                    <div className="badge badge-info">
                                        {problem.tags}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'badge-success';
        case 'medium': return 'badge-warning';
        case 'hard': return 'badge-error';
        default: return 'badge-neutral';
    }
};

export default Home;