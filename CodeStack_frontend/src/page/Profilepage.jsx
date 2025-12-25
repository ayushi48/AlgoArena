// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router'
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// const profileUpdateSchema = z.object({
//     firstName: z
//         .string()
//         .min(3, "First name must be at least 3 characters")
//         .nonempty("First name is required"),

//     lastName: z
//         .string()
//         .min(3, "Last name must be at least 3 characters")
//         .nonempty("Last name is required"),

//     emailId: z
//         .string()
//         .email("Enter a valid email")
//         .nonempty("Email is required"),

//     age: z
//         .coerce
//         .number()
//         .min(6, "Too young")
//         .max(80, "Too old")
//         .refine(val => !isNaN(val), { message: "Age is required" }),

//     role: z
//         .enum(["user", "admin"], { required_error: "Role is required" }),

//     old_password: z
//         .string()
//         .min(8, "Old password must be at least 8 characters")
//         .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//         .regex(/[a-z]/, "Must contain at least one lowercase letter")
//         .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
//         .nonempty("Old password is required"),

//     new_password: z
//         .string()
//         .min(8, "New password must be at least 8 characters")
//         .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//         .regex(/[a-z]/, "Must contain at least one lowercase letter")
//         .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
//         .nonempty("New password is required")
// });




// const Profilepage = () => {
//     const user = useSelector((state) => state.auth.user); // assuming redux auth
//     const [showOldPassword, setShowOldPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitting }
//     } = useForm({
//         resolver: zodResolver(profileUpdateSchema),
//         defaultValues: {
//             firstName: user?.firstName || "",
//             lastName: user?.lastName || "",
//             emailId: user?.emailId || "",
//             age: user?.age || "",
//             role: user?.role || "user",
//             old_password: "",
//             new_password: ""
//         }
//     });

//     const onSubmit = async (data) => {
//         console.log("data");

//         console.log(data);

//         try {
//             const payload = {
//                 ...data,
//                 id: user?._id
//             };
//             const res = await axiosClient.put("/user/profileupdate", payload);
//             alert(res.data.message || "Profile updated successfully!");
//         } catch (error) {
//             console.error(error.response?.data || error.message);
//             alert(error.response?.data?.message || "Update failed");
//         }
//     };

//     return (
//         <div>
//             <div className="flex items-center justify-between px-6 py-4 bg-black/20 shadow-md rounded-xl mb-6 w-full flex-wrap gap-y-4">
//                 <NavLink
//                     to="/"
//                     className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition"
//                 >
//                     Home
//                 </NavLink>

//                 <h1 className="text-xl md:text-2xl font-bold uppercase text-gray-100">
//                     Update Profile
//                 </h1>
//                 {/* Right Section - User Info */}
//                 <div className="text-right hidden sm:block">
//                     <h2 className="text-md md:text-lg font-semibold text-gray-100">
//                         Welcome, <span className="uppercase text-blue-600">{user?.firstName || 'Admin'}</span>
//                     </h2>
//                     <p className="text-sm text-gray-100">{user?.emailId || ' '}</p>
//                 </div>
//             </div>
//             <div className='w-full flex justify-center items-center'>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[98%]">
//                     {/* First Name */}
//                     <div>
//                         <label htmlFor="userfirstname" className="block mb-1">First Name</label>
//                         <input
//                             id='userfirstname'
//                             {...register("firstName")}
//                             className="input input-bordered w-full bg-gray-800 border-gray-700"
//                         />
//                         {errors.firstName && (
//                             <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//                         )}
//                     </div>

//                     {/* Last Name */}
//                     <div>
//                         <label htmlFor="userlasrname" className="block mb-1">Last Name</label>
//                         <input
//                             id='userlasrname'
//                             {...register("lastName")}
//                             className="input input-bordered w-full bg-gray-800 border-gray-700"
//                         />
//                         {errors.lastName && (
//                             <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//                         )}
//                     </div>

//                     {/* Email (read-only) */}
//                     <div>
//                         <label htmlFor="useremail" className="block mb-1">Email</label>
//                         <input
//                             id='useremail'
//                             {...register("emailId")}
//                             readOnly
//                             className="input input-bordered w-full bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed"
//                         />
//                         {errors.emailId && (
//                             <p className="text-red-500 text-sm">{errors.emailId.message}</p>
//                         )}
//                     </div>

//                     {/* Age */}
//                     <div>
//                         <label htmlFor="userage" className="block mb-1">Age</label>
//                         <input
//                             id='userage'
//                             type="number"
//                             {...register("age")}
//                             className="input input-bordered w-full bg-gray-800 border-gray-700"
//                         />
//                         {errors.age && (
//                             <p className="text-red-500 text-sm">{errors.age.message}</p>
//                         )}
//                     </div>

//                     {/* Role (read-only) */}
//                     <div>
//                         <label htmlFor="userrole" className="block mb-1">Role</label>
//                         <input
//                             id='userrole'
//                             {...register("role")}
//                             readOnly
//                             className="input input-bordered w-full bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed"
//                         />
//                     </div>

//                     {/* Old Password */}
//                     <div>
//                         {/* <label htmlFor=""></label> */}
//                         <label htmlFor="old_password" className="block mb-1">Old Password</label>
//                         <div className="relative">
//                             <input
//                                 id='old_password'
//                                 type={showOldPassword ? "text" : "password"}
//                                 {...register("old_password")}
//                                 className="input input-bordered w-full bg-gray-800 border-gray-700 pr-10"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowOldPassword(!showOldPassword)}
//                                 className="absolute right-3 top-2 text-gray-400"
//                             >
//                                 {/* {showOldPassword ? "🙈" : "👁️"} */}
//                                 {showOldPassword ? (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                                         viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
//                     0-8.268-2.943-9.543-7a9.97 9.97 0 
//                     011.563-3.029m5.858.908a3 3 0 
//                     114.243 4.243M9.878 9.878l4.242 
//                     4.242M3 3l3.59 3.59m0 0A9.953 
//                     9.953 0 0112 5c4.478 0 8.268 
//                     2.943 9.543 7a10.025 10.025 0 
//                     01-4.132 5.411L21 21" />
//                                     </svg>
//                                 ) : (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                                         viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                             d="M15 12a3 3 0 11-6 0 3 3 
//                     0 016 0z" />
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                             d="M2.458 12C3.732 7.943 7.523 
//                        5 12 5c4.478 0 8.268 2.943 
//                        9.542 7-1.274 4.057-5.064 
//                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                         {errors.old_password && (
//                             <p className="text-red-500 text-sm">{errors.old_password.message}</p>
//                         )}
//                     </div>

//                     {/* New Password */}
//                     <div>
//                         <label htmlFor='usernewpassword' className="block mb-1">New Password</label>
//                         <div className="relative">
//                             <input
//                                 id='usernewpassword'
//                                 type={showNewPassword ? "text" : "password"}
//                                 {...register("new_password")}
//                                 className="input input-bordered w-full bg-gray-800 border-gray-700 pr-10"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowNewPassword(!showNewPassword)}
//                                 className="absolute right-3 top-2 text-gray-400"
//                             >
//                                 {/* {showNewPassword ? "🙈" : "👁️"} */}
//                                 {showNewPassword ? (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                                         viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
//                     0-8.268-2.943-9.543-7a9.97 9.97 0 
//                     011.563-3.029m5.858.908a3 3 0 
//                     114.243 4.243M9.878 9.878l4.242 
//                     4.242M3 3l3.59 3.59m0 0A9.953 
//                     9.953 0 0112 5c4.478 0 8.268 
//                     2.943 9.543 7a10.025 10.025 0 
//                     01-4.132 5.411L21 21" />
//                                     </svg>
//                                 ) : (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//                                         viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                             d="M15 12a3 3 0 11-6 0 3 3 
//                     0 016 0z" />
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                             d="M2.458 12C3.732 7.943 7.523 
//                        5 12 5c4.478 0 8.268 2.943 
//                        9.542 7-1.274 4.057-5.064 
//                        7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                         {errors.new_password && (
//                             <p className="text-red-500 text-sm">{errors.new_password.message}</p>
//                         )}
//                     </div>

//                     {/* Submit */}
//                     <div className='flex justify-between mb-6'>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="btn btn-primary w-[49%]"
//                         >
//                             {isSubmitting ? "Updating..." : "Update Profile"}
//                         </button>
//                         <button
//                             type="button"
//                             className="btn btn-primary w-[49%]"
//                             onClick={() =>
//                                 reset({
//                                     firstName: user?.firstName || "",
//                                     lastName: "",
//                                     emailId: user?.emailId || "",
//                                     age: "",
//                                     role: user?.role || "user",
//                                     old_password: "",
//                                     new_password: ""
//                                 })
//                             }
//                         >
//                             Reset
//                         </button>

//                     </div>
//                 </form>

//             </div>

//         </div>
//     )
// }
// export default Profilepage
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
const profileUpdateSchema = z.object({
    firstName: z
        .string()
        .min(3, "First name must be at least 3 characters")
        .nonempty("First name is required"),

    lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters")
        .nonempty("Last name is required"),

    emailId: z
        .string()
        .email("Enter a valid email")
        .nonempty("Email is required"),

    age: z
        .coerce
        .number()
        .min(6, "Too young")
        .max(80, "Too old")
        .refine(val => !isNaN(val), { message: "Age is required" }),

    role: z
        .enum(["user", "admin"], { required_error: "Role is required" }),

    old_password: z
        .string()
        .min(8, "Old password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
        .nonempty("Old password is required"),

    new_password: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
        .nonempty("New password is required")
});




const Profilepage = () => {
    const user = useSelector((state) => state.auth.user); // assuming redux auth
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            emailId: user?.emailId || "",
            age: user?.age || "",
            role: user?.role || "user",
            old_password: "",
            new_password: ""
        }
    });

    const onSubmit = async (data) => {
        console.log("data");

        console.log(data);

        try {
            const payload = {
                ...data,
                id: user?._id
            };
            const res = await axiosClient.put("/user/profileupdate", payload);
            alert(res.data.message || "Profile updated successfully!");
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className='bg-[#020617]'>
            <div className="flex items-center justify-between px-6 py-4 bg-base-100 shadow-md rounded-xl mb-6 w-full flex-wrap gap-y-4">
                <NavLink
                    to="/"
                    className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition"
                >
                    Home
                </NavLink>

                <h1 className="text-xl md:text-2xl font-bold uppercase text-gray-100">
                    Update Profile
                </h1>
                {/* Right Section - User Info */}
                <div className="text-right hidden sm:block">
                    <h2 className="text-md md:text-lg font-semibold text-gray-100">
                        Welcome, <span className="uppercase text-blue-600">{user?.firstName || 'Admin'}</span>
                    </h2>
                    <p className="text-sm text-gray-100">{user?.emailId || ' '}</p>
                </div>
            </div>
            <div className='w-full  flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[98%]">
                    {/* First Name */}
                    <div>
                        <label htmlFor="userfirstname" className="block mb-1">First Name</label>
                        <input
                            id='userfirstname'
                            {...register("firstName")}
                            className="input input-bordered w-full bg-gray-800 border-gray-700"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="userlasrname" className="block mb-1">Last Name</label>
                        <input
                            id='userlasrname'
                            {...register("lastName")}
                            className="input input-bordered w-full bg-gray-800 border-gray-700"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                        )}
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label htmlFor="useremail" className="block mb-1">Email</label>
                        <input
                            id='useremail'
                            {...register("emailId")}
                            readOnly
                            className="input input-bordered w-full bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed"
                        />
                        {errors.emailId && (
                            <p className="text-red-500 text-sm">{errors.emailId.message}</p>
                        )}
                    </div>

                    {/* Age */}
                    <div>
                        <label htmlFor="userage" className="block mb-1">Age</label>
                        <input
                            id='userage'
                            type="number"
                            {...register("age")}
                            className="input input-bordered w-full bg-gray-800 border-gray-700"
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm">{errors.age.message}</p>
                        )}
                    </div>

                    {/* Role (read-only) */}
                    <div>
                        <label htmlFor="userrole" className="block mb-1">Role</label>
                        <input
                            id='userrole'
                            {...register("role")}
                            readOnly
                            className="input input-bordered w-full bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed"
                        />
                    </div>

                    {/* Old Password */}
                    <div>
                        {/* <label htmlFor=""></label> */}
                        <label htmlFor="old_password" className="block mb-1">Old Password</label>
                        <div className="relative">
                            <input
                                id='old_password'
                                type={showOldPassword ? "text" : "password"}
                                {...register("old_password")}
                                className="input input-bordered w-full bg-gray-800 border-gray-700 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-3 top-2 text-gray-400"
                            >
                                {/* {showOldPassword ? "🙈" : "👁️"} */}
                                {showOldPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
                    0-8.268-2.943-9.543-7a9.97 9.97 0 
                    011.563-3.029m5.858.908a3 3 0 
                    114.243 4.243M9.878 9.878l4.242 
                    4.242M3 3l3.59 3.59m0 0A9.953 
                    9.953 0 0112 5c4.478 0 8.268 
                    2.943 9.543 7a10.025 10.025 0 
                    01-4.132 5.411L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 
                    0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 
                       5 12 5c4.478 0 8.268 2.943 
                       9.542 7-1.274 4.057-5.064 
                       7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.old_password && (
                            <p className="text-red-500 text-sm">{errors.old_password.message}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor='usernewpassword' className="block mb-1">New Password</label>
                        <div className="relative">
                            <input
                                id='usernewpassword'
                                type={showNewPassword ? "text" : "password"}
                                {...register("new_password")}
                                className="input input-bordered w-full bg-gray-800 border-gray-700 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-2 text-gray-400"
                            >
                                {/* {showNewPassword ? "🙈" : "👁️"} */}
                                {showNewPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
                    0-8.268-2.943-9.543-7a9.97 9.97 0 
                    011.563-3.029m5.858.908a3 3 0 
                    114.243 4.243M9.878 9.878l4.242 
                    4.242M3 3l3.59 3.59m0 0A9.953 
                    9.953 0 0112 5c4.478 0 8.268 
                    2.943 9.543 7a10.025 10.025 0 
                    01-4.132 5.411L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 
                    0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 
                       5 12 5c4.478 0 8.268 2.943 
                       9.542 7-1.274 4.057-5.064 
                       7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.new_password && (
                            <p className="text-red-500 text-sm">{errors.new_password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className='flex justify-between mb-6'>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-[49%]"
                        >
                            {isSubmitting ? "Updating..." : "Update Profile"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary w-[49%]"
                            onClick={() =>
                                reset({
                                    firstName: user?.firstName || "",
                                    lastName: "",
                                    emailId: user?.emailId || "",
                                    age: "",
                                    role: user?.role || "user",
                                    old_password: "",
                                    new_password: ""
                                })
                            }
                        >
                            Reset
                        </button>

                    </div>
                </form>

            </div>

        </div>
    )
}
export default Profilepage