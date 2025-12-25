// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';

// const adminsignupSchema = z.object({
//   firstName: z.string().min(3, "First name must be at least 3 characters"),
//   lastName: z.string().min(3, "Last name must be at least 3 characters"),
//   emailId: z.string().email("Enter a valid email"),
//   password: z.string()
//     .min(8, "Old password must be at least 8 characters")
//     .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Must contain at least one lowercase letter")
//     .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

//   age: z.coerce.number()
//     .min(6, "Can register after age 6")
//     .max(80, "Cannot register after age 80"),
//   role: z.enum(["user", "admin"], { required_error: "Select a role" })
// });

// const AdminSignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm({ resolver: zodResolver(adminsignupSchema) });

//   const onSubmit = async (data) => {
//     try {
//       console.log(data);

//       await axiosClient.post('/user/admin/register', data);
//       alert('Admin Registered Successfully');
//       reset();
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       const message = error.response?.data?.message || error.message;
//       if (message.toLowerCase().includes("email")) {
//         setError("emailId", { type: "server", message });
//       } else {
//         alert('Error: ' + message);
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center p-4 bg-black flex-col min-h-screen">
//       <div className="h-[10vh] flex items-center justify-center">
//         <h1 className="text-3xl font-semibold text-white">Admin Registration</h1>
//       </div>
//       <hr className="border-gray-600" />


//       <div className='w-full flex justify-center'>
//         <div className="w-[90%] mt-4">
//           <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

//             {/* Name Fields */}
//             <div className="flex flex-col space-y-1 w-full">
//               <label className="text-sm font-medium text-white">
//                 Enter the Admin Name
//               </label>
//               <div className="flex gap-4 w-full">
//                 <div className="flex flex-col w-full">
//                   <input
//                     id="firstName"
//                     type="text"
//                     placeholder="First Name"
//                     {...register("firstName")}
//                     className={`input input-bordered w-full bg-gray-800 text-white border ${errors.firstName ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   />
//                   {errors.firstName && (
//                     <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
//                   )}
//                 </div>

//                 <div className="flex flex-col w-full">
//                   <input
//                     id="lastName"
//                     type="text"
//                     placeholder="Last Name"
//                     {...register("lastName")}
//                     className={`input input-bordered w-full bg-gray-800 text-white border ${errors.lastName ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   />
//                   {errors.lastName && (
//                     <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col space-y-1">
//               <label htmlFor="emailId" className="text-sm font-medium text-white">Admin Email</label>
//               <input
//                 type="email"
//                 id="emailId"
//                 placeholder="Email Address"
//                 {...register("emailId")}
//                 className={`input input-bordered w-[100%] bg-gray-800 text-white border ${errors.emailId ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               />
//               {errors.emailId && (
//                 <p className="text-sm text-red-500 mt-1">{errors.emailId.message}</p>
//               )}
//             </div>

//             {/* Age */}
//             <div className="flex flex-col space-y-1">
//               <label htmlFor="age" className="text-sm font-medium text-white">Admin Age</label>
//               <input
//                 type="number"
//                 id="age"
//                 placeholder="Age"
//                 {...register("age")}
//                 className={`input input-bordered w-[100%]    bg-gray-800 text-white border ${errors.age ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               />
//               {errors.age && (
//                 <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>
//               )}
//             </div>


//             {/* Password */}
//             <div>
//               <div>
//                 <label htmlFor="user_password" className="text-sm font-medium text-white">Password</label>
//               </div>
//               <div className="flex flex-col space-y-1 relative">
//                 <input
//                   id='user_password'
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   {...register("password")}
//                   className={`input input-bordered w-full bg-gray-800 text-white border ${errors.password ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 />
//                 <button
//                   type="button"
//                   onMouseDown={(e) => e.preventDefault()}
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                       viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
//                     0-8.268-2.943-9.543-7a9.97 9.97 0 
//                     011.563-3.029m5.858.908a3 3 0 
//                     114.243 4.243M9.878 9.878l4.242 
//                     4.242M3 3l3.59 3.59m0 0A9.953 
//                     9.953 0 0112 5c4.478 0 8.268 
//                     2.943 9.543 7a10.025 10.025 0 
//                     01-4.132 5.411L21 21" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                       viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 
//                     0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 
//                        5 12 5c4.478 0 8.268 2.943 
//                        9.542 7-1.274 4.057-5.064 
//                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
//                 )}
//               </div>
//             </div>
//             {/* Role */}
//             <div className="flex flex-col space-y-1">
//               <label htmlFor="role" className="text-sm font-medium text-white">User Role</label>
//               <select
//                 id="role"
//                 {...register("role")}
//                 className={`select bg-gray-800 w-full text-white border ${errors.role ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               >
//                 <option value="">-- Select Role --</option>
//                 <option value="user" className="uppercase bg-black">User</option>
//                 <option value="admin" className="uppercase bg-black">Admin</option>
//               </select>
//               {errors.role && (
//                 <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
//               )}
//             </div>




//             <div className='flex justify-between'>
//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="btn btn-primary w-[49%] mt-2 bg-blue-600 border-none hover:bg-blue-700 transition-all"
//               >
//                 {isSubmitting ? 'Creating Account...' : 'Register'}
//               </button>
//               <button type='reset'
//                 className="btn btn-primary w-[49%] mt-2 bg-blue-600 border-none hover:bg-blue-700 transition-all"
//               >Reset</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSignUp;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';

const adminsignupSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  emailId: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Old password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  age: z.coerce
    .number()
    .min(6, "Can register after age 6")
    .max(80, "Cannot register after age 80"),
  role: z.enum(["user", "admin"], { required_error: "Select a role" }),
});

const AdminSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminsignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/user/admin/register', data);
      alert('Admin Registered Successfully');
      reset();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      if (message.toLowerCase().includes("email")) {
        setError("emailId", { type: "server", message });
      } else {
        alert('Error: ' + message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col px-4 py-6">

      {/* ===== Header ===== */}
      <div className="h-[10vh] flex items-center justify-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Admin Registration
        </h1>
      </div>

      <div className="flex justify-center flex-1">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-6">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* ===== Name ===== */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">
                Admin Name
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    className={`input input-bordered w-full bg-gray-800 text-white
                      ${errors.firstName ? "border-red-500" : "border-gray-700"}`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    className={`input input-bordered w-full bg-gray-800 text-white
                      ${errors.lastName ? "border-red-500" : "border-gray-700"}`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ===== Email ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="Email Address"
                {...register("emailId")}
                className={`input input-bordered w-full bg-gray-800 text-white
                  ${errors.emailId ? "border-red-500" : "border-gray-700"}`}
              />
              {errors.emailId && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* ===== Age ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Admin Age
              </label>
              <input
                type="number"
                placeholder="Age"
                {...register("age")}
                className={`input input-bordered w-full bg-gray-800 text-white
                  ${errors.age ? "border-red-500" : "border-gray-700"}`}
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* ===== Password ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={`input input-bordered w-full bg-gray-800 text-white pr-10
                    ${errors.password ? "border-red-500" : "border-gray-700"}`}
                />

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ===== Role ===== */}
            <div>
              <label className="text-sm font-medium text-gray-300">
                User Role
              </label>
              <select
                {...register("role")}
                className={`select w-full bg-gray-800 text-white
                  ${errors.role ? "border-red-500" : "border-gray-700"}`}
              >
                <option value="">-- Select Role --</option>
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
              </select>
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* ===== Actions ===== */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Creating Account..." : "Register"}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-outline flex-1"
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
