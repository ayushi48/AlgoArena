import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;

    try {
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Delete Problems</h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-base-200">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-base-300 text-xs uppercase text-gray-600 dark:text-gray-400 border-b">
            <tr>
              <th className="px-4 py-3 w-1/12">#</th>
              <th className="px-4 py-3 w-4/12">Title</th>
              <th className="px-4 py-3 w-2/12">Difficulty</th>
              <th className="px-4 py-3 w-3/12">Tags</th>
              <th className="px-4 py-3 w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-base-300">
            {problems.map((problem, index) => (
              <tr key={problem._id} className="hover:bg-gray-50 dark:hover:bg-base-100 transition">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 uppercase">{problem.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-2xl text-xs font-medium uppercase ${problem.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : problem.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {/* <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-base-100 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                    {problem.tags}
                  </span> */}
                  <span className='uppercase'>
                    {problem.tags}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDelete(problem._id)}
                      className="btn btn-sm bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AdminDelete;


    // <div className="container mx-auto p-4">
    //   <div className="flex justify-between items-center mb-6">
    //     <h1 className="text-3xl font-bold">Delete Problems</h1>
    //   </div>

    //   <div className="overflow-x-auto">
    //     <table className="table table-zebra w-full">
    //       <thead>
    //         <tr>
    //           <th className="w-1/12">#</th>
    //           <th className="w-4/12">Title</th>
    //           <th className="w-2/12">Difficulty</th>
    //           <th className="w-3/12">Tags</th>
    //           <th className="w-2/12">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {problems.map((problem, index) => (
    //           <tr key={problem._id}>
    //             <th>{index + 1}</th>
    //             <td>{problem.title}</td>
    //             <td>
    //               <span className={`badge ${
    //                 problem.difficulty === 'Easy' 
    //                   ? 'badge-success' 
    //                   : problem.difficulty === 'Medium' 
    //                     ? 'badge-warning' 
    //                     : 'badge-error'
    //               }`}>
    //                 {problem.difficulty}
    //               </span>
    //             </td>
    //             <td>
    //               <span className="badge badge-outline">
    //                 {problem.tags}
    //               </span>
    //             </td>
    //             <td>
    //               <div className="flex space-x-2">
    //                 <button 
    //                   onClick={() => handleDelete(problem._id)}
    //                   className="btn btn-sm btn-error"
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>