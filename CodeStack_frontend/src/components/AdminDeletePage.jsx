// import React, { useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import axiosClient from '../utils/axiosClient';

// const AdminDeletePage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [allUsers, setAllUsers] = useState([]);
//   const [role, setRole] = useState("");
//   const [plans, setPlans] = useState("");
//   const filteredUsers = allUsers.filter((data) => {
//     return (role ? data.role === role : true) && (plans ? data.plans === plans : true);
//   });


//   const fetchDetails = useCallback(async () => {
//     try {
//       const { data } = await axiosClient.get('/user/get-all-details');

//       setAllUsers(data);
//     } catch (error) {
//       console.error('Error fetching problems:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDetails();
//   }, [fetchDetails, user]);

//   const handleDelete = async (userId) => {
//     try {
//       if (userId === user?._id) {
//         alert("Can't delete your data from here")
//         throw new Error("access denied");

//       }
//       await axiosClient.delete(`/user/deleteuser/${userId}`);
//       await fetchDetails();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-4 bg-black/20 shadow-md rounded-xl mb-6 w-full flex-wrap gap-y-4">
//         {user?.role === 'admin' ? (
//           <div>
//             <NavLink to="/adminpage" className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition">
//               Admin Panel
//             </NavLink>
//           </div>
//         ) : (
//           <NavLink to="/" className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition">
//             Home
//           </NavLink>
//         )}
//         <h1 className="text-xl md:text-2xl font-bold uppercase text-gray-100">
//           User Details
//         </h1>
//         <div className="text-right hidden sm:block">
//           <h2 className="text-md md:text-lg font-semibold text-gray-100">
//             Welcome, <span className="uppercase text-blue-600">{user?.firstName || 'Admin'}</span>
//           </h2>
//           <p className="text-sm text-gray-100">{user?.emailId || ''}</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-8 mb-4 justify-around">
//         {/* Role Selector */}
//         <div className="flex items-center gap-2.5">
//           <label htmlFor="role" className="font-medium">
//             Role
//           </label>
//           <select
//             name="role"
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="border px-2 py-1 rounded"
//           >
//             <option value="">-- Select Role --</option>
//             <option value="user">USER</option>
//             <option value="admin">ADMIN</option>
//           </select>
//         </div>

//         {/* Plans Selector */}
//         <div className="flex items-center gap-2.5">
//           <label htmlFor="plans" className="font-medium">
//             Plan
//           </label>
//           <select
//             name="plans"
//             id="plans"
//             value={plans}
//             onChange={(e) => setPlans(e.target.value)}
//             className="border px-2 py-1 rounded"
//           >
//             <option value="">-- Select Plan --</option>
//             <option value="free">FREE</option>
//             <option value="premium">PREMIUM</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div>
//         <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
//           <thead className="bg-gray-100 dark:bg-base-300 text-xs uppercase text-gray-600 dark:text-gray-400 border-b">
//             <tr>
//               <th className="px-4 py-3 w-1/12">#</th>
//               <th className="px-4 py-3 w-4/12">Name</th>
//               <th className="px-4 py-3 w-2/12">Plans</th>
//               <th className="px-4 py-3 w-3/12">Role</th>
//               <th className="px-4 py-3 w-2/12">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-base-300">
//             {filteredUsers.map((userdetails, index) => (
//               <tr key={userdetails._id} className="hover:bg-gray-900/25 transition">
//                 <td className="px-4 py-3">{index + 1}</td>
//                 <td className="px-4 py-3 uppercase">{userdetails.firstName}</td>
//                 <td className="px-4 py-3">
//                   <span className={`px-2 py-1 rounded-2xl text-xs font-medium uppercase ${userdetails.plans === 'premium' ? 'text-green-800' : 'text-red-800'}`}>
//                     {userdetails.plans}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 uppercase">{userdetails.role}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDelete(userdetails._id)}
//                       className="btn btn-sm bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-150"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDeletePage;
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';

const AdminDeletePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [allUsers, setAllUsers] = useState([]);
  const [role, setRole] = useState("");
  const [plans, setPlans] = useState("");

  const filteredUsers = allUsers.filter((data) => {
    return (role ? data.role === role : true) &&
           (plans ? data.plans === plans : true);
  });

  const fetchDetails = useCallback(async () => {
    try {
      const { data } = await axiosClient.get('/user/get-all-details');
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails, user]);

  const handleDelete = async (userId) => {
    try {
      if (userId === user?._id) {
        alert("Can't delete your data from here");
        return;
      }
      await axiosClient.delete(`/user/deleteuser/${userId}`);
      await fetchDetails();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6">

      {/* ================= Header ================= */}
      <div className="flex items-center justify-between bg-base-100 rounded-xl px-6 py-4 shadow-md mb-6 flex-wrap gap-y-4">

        {user?.role === 'admin' ? (
          <NavLink
            to="/adminpage"
            className="text-sm font-semibold uppercase text-gray-400 hover:text-primary transition"
          >
            ← Admin Panel
          </NavLink>
        ) : (
          <NavLink
            to="/"
            className="text-sm font-semibold uppercase text-gray-400 hover:text-primary transition"
          >
            ← Home
          </NavLink>
        )}

        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          User Management
        </h1>

        <div className="hidden sm:block text-right">
          <p className="text-sm text-gray-400">Welcome</p>
          <p className="font-semibold text-primary uppercase">
            {user?.firstName || 'Admin'}
          </p>
        </div>
      </div>

      {/* ================= Filters ================= */}
      <div className="max-w-6xl mx-auto bg-base-100 rounded-xl shadow-md px-6 py-4 mb-6 flex flex-wrap gap-6 justify-between">

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select select-sm bg-base-200 text-white"
          >
            <option value="">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">
            Plan
          </label>
          <select
            value={plans}
            onChange={(e) => setPlans(e.target.value)}
            className="select select-sm bg-base-200 text-white"
          >
            <option value="">All</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {/* ================= Table ================= */}
      <div className="max-w-6xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead className="bg-base-200 text-xs uppercase text-gray-400">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Plan</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-300">
              {filteredUsers.map((userdetails, index) => (
                <tr
                  key={userdetails._id}
                  className="hover:bg-base-200 transition"
                >
                  <td>{index + 1}</td>

                  <td className="uppercase font-medium text-white">
                    {userdetails.firstName}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                        ${
                          userdetails.plans === 'premium'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                    >
                      {userdetails.plans}
                    </span>
                  </td>

                  <td className="uppercase text-gray-300">
                    {userdetails.role}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(userdetails._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeletePage;
