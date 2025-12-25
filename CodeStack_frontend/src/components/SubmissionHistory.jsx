// // import { useState, useEffect } from 'react';
// // import axiosClient from '../utils/axiosClient';

// // const SubmissionHistory = ({ problemId }) => {
// //   const [submissions, setSubmissions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedSubmission, setSelectedSubmission] = useState(null);
// //   useEffect(() => {
// //     const fetchSubmissions = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
// //         if (!response.data) {
// //           response.data = []
// //         }
// //         setSubmissions(response.data);
// //         setError(null);
// //       } catch (err) {
// //         setError('Failed to fetch submission history');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSubmissions();
// //   }, [problemId]);

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'accepted': return 'badge-success';
// //       case 'wrong': return 'badge-error';
// //       case 'error': return 'badge-warning';
// //       case 'pending': return 'badge-info';
// //       default: return 'badge-neutral';
// //     }
// //   };

// //   const formatMemory = (memory) => {
// //     if (memory < 1024) return `${memory} kB`;
// //     return `${(memory / 1024).toFixed(2)} MB`;
// //   };

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleString();
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <span className="loading loading-spinner loading-lg"></span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="alert alert-error shadow-lg my-4">
// //         <div>
// //           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //           </svg>
// //           <span>{error}</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-6 text-center">Submission History</h2>

// //       {(submissions.length === 0) ? (
// //         <div className="alert alert-info shadow-lg">
// //           <div>
// //             <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //             </svg>
// //             <span>No submissions found for this problem</span>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="overflow-x-auto">
// //             <table className="table table-zebra w-full">
// //               <thead>
// //                 <tr>
// //                   <th>#</th>
// //                   <th>Language</th>
// //                   <th>Status</th>
// //                   <th>Runtime</th>
// //                   <th>Memory</th>
// //                   <th>Test Cases</th>
// //                   <th>Submitted</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {submissions.map((sub, index) => (
// //                   <tr key={sub._id}>
// //                     <td>{index + 1}</td>
// //                     <td className="font-mono">{sub.language}</td>
// //                     <td>
// //                       <span className={`badge ${getStatusColor(sub.status)}`}>
// //                         {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
// //                       </span>
// //                     </td>

// //                     <td className="font-mono">{sub.runtime}sec</td>
// //                     <td className="font-mono">{formatMemory(sub.memory)}</td>
// //                     <td className="font-mono">{sub.testCasesPassed}/{sub.testCasesTotal}</td>
// //                     <td>{formatDate(sub.createdAt)}</td>
// //                     <td>
// //                       <button
// //                         className="btn btn-s btn-outline"
// //                         onClick={() => setSelectedSubmission(sub)}
// //                       >
// //                         Code
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <p className="mt-4 text-sm text-gray-500">
// //             Showing {submissions.length} submissions
// //           </p>
// //         </>
// //       )}

// //       {/* Code View Modal */}
// //       {selectedSubmission && (
// //         <div className="modal modal-open">
// //           <div className="modal-box w-11/12 max-w-5xl">
// //             <h3 className="font-bold text-lg mb-4">
// //               Submission Details: {selectedSubmission.language}
// //             </h3>

// //             <div className="mb-4">
// //               <div className="flex flex-wrap gap-2 mb-2">
// //                 <span className={`badge ${getStatusColor(selectedSubmission.status)}`}>
// //                   {selectedSubmission.status}
// //                 </span>
// //                 <span className="badge badge-outline">
// //                   Runtime: {selectedSubmission.runtime}s
// //                 </span>
// //                 <span className="badge badge-outline">
// //                   Memory: {formatMemory(selectedSubmission.memory)}
// //                 </span>
// //                 <span className="badge badge-outline">
// //                   Passed: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
// //                 </span>
// //               </div>

// //               {selectedSubmission.errorMessage && (
// //                 <div className="alert alert-error mt-2">
// //                   <div>
// //                     <span>{selectedSubmission.errorMessage}</span>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto">
// //               <code>{selectedSubmission.code}</code>
// //             </pre>

// //             <div className="modal-action">
// //               <button
// //                 className="btn"
// //                 onClick={() => setSelectedSubmission(null)}
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SubmissionHistory;
// import { useState, useEffect } from 'react';
// import axiosClient from '../utils/axiosClient';

// const SubmissionHistory = ({ problemId }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSubmission, setSelectedSubmission] = useState(null);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosClient.get(
//           `/problem/submittedProblem/${problemId}`
//         );
//         if (!response.data) {
//           response.data = [];
//         }
//         setSubmissions(response.data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch submission history');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [problemId]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'accepted':
//         return 'badge-success';
//       case 'wrong':
//         return 'badge-error';
//       case 'error':
//         return 'badge-warning';
//       case 'pending':
//         return 'badge-info';
//       default:
//         return 'badge-neutral';
//     }
//   };

//   const formatMemory = (memory) => {
//     if (memory < 1024) return `${memory} kB`;
//     return `${(memory / 1024).toFixed(2)} MB`;
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   /* Loading */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   /* Error */
//   if (error) {
//     return (
//       <div className="alert alert-error shadow-md my-4">
//         <div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="stroke-current h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <h2 className="text-xl font-bold text-white">
//         Submission History
//       </h2>

//       {/* Empty State */}
//       {submissions.length === 0 ? (
//         <div className="alert alert-info shadow-md">
//           <div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="stroke-current h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//               />
//             </svg>
//             <span>No submissions found for this problem</span>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Table */}
//           {/* Table */}
//           <div className="overflow-x-auto rounded-2xl border border-base-300 shadow-sm">
//             <table className="table table-zebra w-full text-sm">
//               <thead className="bg-gradient-to-r from-base-200 to-base-300">
//                 <tr>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">#</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">Language</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">Status</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">Runtime</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">Memory</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">Testcases</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400">Submitted</th>
//                   <th className="text-xs uppercase tracking-wider text-gray-400 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {submissions.map((sub, index) => (
//                   <tr
//                     key={sub._id}
//                     className="hover:bg-base-200 transition-colors duration-200"
//                   >
//                     <td className="font-medium text-gray-300">
//                       {index + 1}
//                     </td>

//                     <td className="font-mono text-xs text-gray-200">
//                       {sub.language}
//                     </td>

//                     <td>
//                       <span
//                         className={`badge badge-sm font-semibold tracking-wide ${getStatusColor(
//                           sub.status
//                         )}`}
//                       >
//                         {sub.status.charAt(0).toUpperCase() +
//                           sub.status.slice(1)}
//                       </span>
//                     </td>

//                     <td className="font-mono text-xs text-gray-300">
//                       {sub.runtime}s
//                     </td>

//                     <td className="font-mono text-xs text-gray-300">
//                       {formatMemory(sub.memory)}
//                     </td>

//                     <td className="font-mono text-xs text-gray-300">
//                       {sub.testCasesPassed}/{sub.testCasesTotal}
//                     </td>

//                     <td className="text-xs text-gray-400 whitespace-nowrap">
//                       {formatDate(sub.createdAt)}
//                     </td>

//                     <td className="text-center">
//                       <button
//                         className="btn btn-xs btn-outline btn-primary font-medium tracking-wide"
//                         onClick={() => setSelectedSubmission(sub)}
//                       >
//                         View Code
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <p className="text-xs text-gray-400 mt-3">
//             Showing {submissions.length} submissions
//           </p>
//         </>
//       )}

//       {/* Code View Modal */}
//       {selectedSubmission && (
//         <div className="modal modal-open">
//           <div className="modal-box w-11/12 max-w-5xl rounded-2xl shadow-xl">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-5">
//               <h3 className="font-display font-bold text-xl tracking-tight text-white">
//                 Submission Details
//                 <span className="ml-2 text-sm font-medium text-gray-400">
//                   — {selectedSubmission.language}
//                 </span>
//               </h3>
//             </div>

//             {/* Meta */}
//             <div className="flex flex-wrap gap-2 mb-5">
//               <span
//                 className={`badge font-semibold tracking-wide ${getStatusColor(
//                   selectedSubmission.status
//                 )}`}
//               >
//                 {selectedSubmission.status}
//               </span>

//               <span className="badge badge-outline text-xs font-medium">
//                 Runtime: {selectedSubmission.runtime}s
//               </span>

//               <span className="badge badge-outline text-xs font-medium">
//                 Memory: {formatMemory(selectedSubmission.memory)}
//               </span>

//               <span className="badge badge-outline text-xs font-medium">
//                 Passed: {selectedSubmission.testCasesPassed}/
//                 {selectedSubmission.testCasesTotal}
//               </span>
//             </div>

//             {/* Error Message */}
//             {selectedSubmission.errorMessage && (
//               <div className="alert alert-error mb-5 rounded-lg">
//                 <div>
//                   <span className="text-sm">
//                     {selectedSubmission.errorMessage}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Code Viewer */}
//             <div className="rounded-xl overflow-hidden border border-base-300 mb-6">
//               <div className="bg-base-200 px-4 py-2 text-xs uppercase tracking-widest text-gray-400">
//                 Submitted Code
//               </div>

//               <pre className="bg-[#0b1220] text-gray-100 p-5 text-sm font-mono overflow-x-auto leading-relaxed">
//                 <code>{selectedSubmission.code}</code>
//               </pre>
//             </div>

//             {/* Actions */}
//             <div className="modal-action">
//               <button
//                 className="btn btn-sm btn-outline font-medium tracking-wide"
//                 onClick={() => setSelectedSubmission(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default SubmissionHistory;
import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(
          `/problem/submittedProblem/${problemId}`
        );
        setSubmissions(response?.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'badge-success';
      case 'wrong':
        return 'badge-error';
      case 'error':
        return 'badge-warning';
      case 'pending':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="alert alert-error shadow-md my-4">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden space-y-6">

      {/* ===== HEADER ===== */}
      <h2 className="text-xl font-bold tracking-tight text-white">
        Submission History
      </h2>

      {/* ===== EMPTY STATE ===== */}
      {submissions.length === 0 ? (
        <div className="alert alert-info shadow-md">
          <span>No submissions found for this problem</span>
        </div>
      ) : (
        <>
          {/* ===== TABLE WRAPPER (SCROLL SAFE) ===== */}
          <div className="flex-1 overflow-x-auto overflow-y-auto rounded-2xl border border-base-300 shadow-sm">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-gradient-to-r from-base-200 to-base-300 sticky top-0 z-10">
                <tr>
                  <th className="text-xs uppercase tracking-wider text-gray-400">#</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400">Language</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400">Status</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400">Runtime</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400">Memory</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400">Testcases</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400">Submitted</th>
                  <th className="text-xs uppercase tracking-wider text-gray-400 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((sub, index) => (
                  <tr
                    key={sub._id}
                    className="hover:bg-base-200 transition-colors duration-200"
                  >
                    <td className="font-medium text-gray-300">
                      {index + 1}
                    </td>

                    <td className="font-mono text-xs text-gray-200">
                      {sub.language}
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm font-semibold tracking-wide ${getStatusColor(
                          sub.status
                        )}`}
                      >
                        {sub.status.charAt(0).toUpperCase() +
                          sub.status.slice(1)}
                      </span>
                    </td>

                    <td className="font-mono text-xs text-gray-300">
                      {sub.runtime}s
                    </td>

                    <td className="font-mono text-xs text-gray-300">
                      {formatMemory(sub.memory)}
                    </td>

                    <td className="font-mono text-xs text-gray-300">
                      {sub.testCasesPassed}/{sub.testCasesTotal}
                    </td>

                    <td className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(sub.createdAt)}
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-xs btn-outline btn-primary font-medium tracking-wide"
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        View Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400">
            Showing {submissions.length} submissions
          </p>
        </>
      )}

      {/* ================= MODAL ================= */}
      {selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">

            {/* ===== MODAL HEADER ===== */}
            <h3 className="font-bold text-xl tracking-tight text-white mb-4">
              Submission Details
              <span className="ml-2 text-sm font-medium text-gray-400">
                — {selectedSubmission.language}
              </span>
            </h3>

            {/* ===== META ===== */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`badge font-semibold tracking-wide ${getStatusColor(
                  selectedSubmission.status
                )}`}
              >
                {selectedSubmission.status}
              </span>

              <span className="badge badge-outline text-xs">
                Runtime: {selectedSubmission.runtime}s
              </span>

              <span className="badge badge-outline text-xs">
                Memory: {formatMemory(selectedSubmission.memory)}
              </span>

              <span className="badge badge-outline text-xs">
                Passed: {selectedSubmission.testCasesPassed}/
                {selectedSubmission.testCasesTotal}
              </span>
            </div>

            {/* ===== ERROR MESSAGE ===== */}
            {selectedSubmission.errorMessage && (
              <div className="alert alert-error mb-4 rounded-lg">
                <span className="text-sm">
                  {selectedSubmission.errorMessage}
                </span>
              </div>
            )}

            {/* ===== CODE VIEW (SCROLL SAFE) ===== */}
            <div className="flex-1 rounded-xl overflow-hidden border border-base-300 mb-4 flex flex-col">
              <div className="bg-base-200 px-4 py-2 text-xs uppercase tracking-widest text-gray-400 shrink-0">
                Submitted Code
              </div>

              <pre className="flex-1 bg-[#0b1220] text-gray-100 p-5 text-sm font-mono overflow-x-auto overflow-y-auto leading-relaxed">
                <code>{selectedSubmission.code}</code>
              </pre>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="modal-action">
              <button
                className="btn btn-sm btn-outline font-medium tracking-wide"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;
