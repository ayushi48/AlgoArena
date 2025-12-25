// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const problemSchema = z.object({
//     title: z.string().min(1, 'Title is required'),
//     description: z.string().min(1, 'Description is required'),
//     difficulty: z.enum(['easy', 'medium', 'hard']),
//     tags: z.enum(['array', 'linkedlist', 'graph', 'dp']),
//     visibletestcases: z.array(
//         z.object({
//             input: z.string().min(1),
//             output: z.string().min(1),
//             explanation: z.string().min(1),
//         })
//     ).min(1),
//     hiddentestcases: z.array(
//         z.object({
//             input: z.string().min(1),
//             output: z.string().min(1),
//         })
//     ).min(1),
//     StartCode: z.array(
//         z.object({
//             language: z.enum(['c++', 'java', 'javaScript']),
//             initialcode: z.string().min(1),
//         })
//     ).length(3),
//     referenceSolution: z.array(
//         z.object({
//             language: z.enum(['c++', 'java', 'javaScript']),
//             completeCode: z.string().min(1),
//         })
//     ).length(3),
// });

// const AdminUpdateform = () => {
//     const { id } = useParams();
//     const [loading, setLoading] = useState(true);
//     const { user } = useSelector((state) => state.auth);
//     const navigate = useNavigate();

//     const {
//         register,
//         control,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm({
//         resolver: zodResolver(problemSchema),
//         defaultValues: {
//             title: '',
//             description: '',
//             difficulty: 'easy',
//             tags: 'array',
//             visibletestcases: [{ input: '', output: '', explanation: '' }],
//             hiddentestcases: [{ input: '', output: '' }],
//             StartCode: [
//                 { language: 'c++', initialcode: '//write Code Here' },
//                 { language: 'java', initialcode: '//write Code Here' },
//                 { language: 'javaScript', initialcode: '//write Code Here' }
//             ],
//             referenceSolution: [
//                 { language: 'c++', completeCode: '' },
//                 { language: 'java', completeCode: '' },
//                 { language: 'javaScript', completeCode: '' }
//             ]
//         }
//     });

//     const { fields: visibleFields, append: addVisible, remove: removeVisible } = useFieldArray({
//         control,
//         name: 'visibletestcases'
//     });

//     const { fields: hiddenFields, append: addHidden, remove: removeHidden } = useFieldArray({
//         control,
//         name: 'hiddentestcases'
//     });

//     // Fetch problem data
//     useEffect(() => {
//         const fetchProblem = async () => {
//             try {
//                 const { data } = await axiosClient.get(`/problem/problemById/${id}`);
//                 reset(data);
//             } catch (error) {
//                 console.error('Error fetching problem:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblem();
//     }, [id, reset]);

//     const onSubmit = async (formData) => {
//         try {
//             await axiosClient.put(`/problem/update/${id}`, formData);
//             alert('Problem updated successfully!');
//             navigate('/adminpage');
//         } catch (error) {
//             console.error(error.response?.data || error.message);
//             alert('Error: ' + (error.response?.data?.message || error.message));
//         }
//     };

//     if (loading) {
//         return <p className="text-center text-lg">Loading...</p>;
//     }

//     return (
//         <div>
//             {/* Top Bar */}
//             <div className="flex items-center justify-between px-6 py-4 bg-black/20 shadow-md rounded-xl mb-6 w-full flex-wrap gap-y-4">
//                 {user?.role === 'admin' ? (
//                     <NavLink
//                         to="/adminpage"
//                         className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition"
//                     >
//                         Admin Panel
//                     </NavLink>
//                 ) : (
//                     <NavLink
//                         to="/"
//                         className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition"
//                     >
//                         Home
//                     </NavLink>
//                 )}
//                 <h1 className="text-xl md:text-2xl font-bold uppercase text-gray-100">
//                     Update Problem
//                 </h1>
//                 <div className="text-right hidden sm:block">
//                     <h2 className="text-md md:text-lg font-semibold text-gray-100">
//                         Welcome, <span className="uppercase text-blue-600">{user?.firstName || 'Admin'}</span>
//                     </h2>
//                     <p className="text-sm text-gray-100">{user?.emailId || ' '}</p>
//                 </div>
//             </div>

//             {/* Form */}
//             <div className="max-w-4xl mx-auto py-10">
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     {/* Title */}
//                     <div>
//                         <input {...register("title")} placeholder="Title Of The Question" className="input input-bordered w-full" />
//                         {errors.title && <p className="text-red-500">{errors.title.message}</p>}
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full h-24" />
//                         {errors.description && <p className="text-red-500">{errors.description.message}</p>}
//                     </div>

//                     {/* Difficulty & Tags */}
//                     <div className="flex gap-4">
//                         <select {...register("difficulty")} className="select select-bordered">
//                             <option value="easy">Easy</option>
//                             <option value="medium">Medium</option>
//                             <option value="hard">Hard</option>
//                         </select>
//                         <select {...register("tags")} className="select select-bordered">
//                             <option value="array">Array</option>
//                             <option value="linkedlist">Linked List</option>
//                             <option value="graph">Graph</option>
//                             <option value="dp">DP</option>
//                         </select>
//                     </div>

//                     {/* Visible Test Cases */}
//                     <div>
//                         <h2 className="text-lg font-semibold mb-2">Visible Test Cases</h2>
//                         {visibleFields.map((field, index) => (
//                             <div key={field.id} className="mb-4 space-y-2">
//                                 <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
//                                 <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
//                                 <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full" />
//                                 <button type="button" onClick={() => removeVisible(index)} className="btn btn-sm btn-error">Remove</button>
//                             </div>
//                         ))}
//                         <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm btn-primary">Add Visible Case</button>
//                     </div>

//                     {/* Hidden Test Cases */}
//                     <div>
//                         <h2 className="text-lg font-semibold mb-2">Hidden Test Cases</h2>
//                         {hiddenFields.map((field, index) => (
//                             <div key={field.id} className="mb-4 space-y-2">
//                                 <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
//                                 <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
//                                 <button type="button" onClick={() => removeHidden(index)} className="btn btn-sm btn-error">Remove</button>
//                             </div>
//                         ))}
//                         <button type="button" onClick={() => addHidden({ input: '', output: '' })} className="btn btn-sm btn-primary">Add Hidden Case</button>
//                     </div>

//                     {/* Start Code & Reference Solution */}
//                     {[0, 1, 2].map((index) => (
//                         <div key={index}>
//                             <h2 className="text-lg font-semibold">{['C++', 'Java', 'JavaScript'][index]}</h2>
//                             <textarea {...register(`StartCode.${index}.initialcode`)} placeholder="Starter code" className="textarea textarea-bordered w-full h-28" />
//                             <textarea {...register(`referenceSolution.${index}.completeCode`)} placeholder="Reference solution" className="textarea textarea-bordered w-full h-28" />
//                         </div>
//                     ))}

//                     <button type="submit" className="btn btn-primary w-full">Update Problem</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminUpdateform;

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ====================== SCHEMA ====================== */
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedlist', 'graph', 'dp']),
  visibletestcases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1),
    })
  ).min(1),
  hiddentestcases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
    })
  ).min(1),
  StartCode: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javaScript']),
      initialcode: z.string().min(1),
    })
  ).length(3),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['c++', 'java', 'javaScript']),
      completeCode: z.string().min(1),
    })
  ).length(3),
});

/* ====================== COMPONENT ====================== */
const AdminUpdateform = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'easy',
      tags: 'array',
      visibletestcases: [{ input: '', output: '', explanation: '' }],
      hiddentestcases: [{ input: '', output: '' }],
      StartCode: [
        { language: 'c++', initialcode: '// write C++ code here' },
        { language: 'java', initialcode: '// write Java code here' },
        { language: 'javaScript', initialcode: '// write JavaScript code here' },
      ],
      referenceSolution: [
        { language: 'c++', completeCode: '' },
        { language: 'java', completeCode: '' },
        { language: 'javaScript', completeCode: '' },
      ],
    },
  });

  const { fields: visibleFields, append: addVisible, remove: removeVisible } =
    useFieldArray({ control, name: 'visibletestcases' });

  const { fields: hiddenFields, append: addHidden, remove: removeHidden } =
    useFieldArray({ control, name: 'hiddentestcases' });

  /* ====================== FETCH ====================== */
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const { data } = await axiosClient.get(`/problem/problemById/${id}`);
        reset(data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id, reset]);

  /* ====================== SUBMIT ====================== */
  const onSubmit = async (formData) => {
    try {
      await axiosClient.put(`/problem/update/${id}`, formData);
      alert('Problem updated successfully!');
      navigate('/adminpage');
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  /* ====================== LOADING ====================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ====================== UI ====================== */
  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 overflow-y-auto">

      {/* ===== HEADER ===== */}
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
          Update Problem
        </h1>

        <div className="hidden sm:block text-right">
          <p className="text-sm text-gray-400">Welcome</p>
          <p className="font-semibold text-primary uppercase">
            {user?.firstName || 'Admin'}
          </p>
        </div>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="max-w-5xl mx-auto bg-base-100 rounded-2xl shadow-xl p-6">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* ===== BASIC INFO ===== */}
          <input
            {...register("title")}
            placeholder="Problem Title"
            className="input input-bordered w-full bg-gray-800 text-white"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <textarea
            {...register("description")}
            placeholder="Problem Description"
            className="textarea textarea-bordered w-full bg-gray-800 text-white h-32"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

          <div className="flex gap-4">
            <select {...register("difficulty")} className="select select-bordered bg-gray-800 text-white">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select {...register("tags")} className="select select-bordered bg-gray-800 text-white">
              <option value="array">Array</option>
              <option value="linkedlist">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>

          {/* ===== VISIBLE TESTCASES ===== */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-white">Visible Test Cases</h2>
            {visibleFields.map((_, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full bg-gray-800 text-white" />
                <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full bg-gray-800 text-white" />
                <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full bg-gray-800 text-white" />
                <button type="button" onClick={() => removeVisible(index)} className="btn btn-sm btn-error">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm btn-primary">
              Add Visible Case
            </button>
          </div>

          {/* ===== HIDDEN TESTCASES ===== */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-white">Hidden Test Cases</h2>
            {hiddenFields.map((_, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full bg-gray-800 text-white" />
                <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full bg-gray-800 text-white" />
                <button type="button" onClick={() => removeHidden(index)} className="btn btn-sm btn-error">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addHidden({ input: '', output: '' })} className="btn btn-sm btn-primary">
              Add Hidden Case
            </button>
          </div>

          {/* ===== CODE SECTIONS ===== */}
          {['C++', 'Java', 'JavaScript'].map((lang, index) => (
            <div key={index}>
              <h2 className="font-semibold text-lg text-white mb-2">{lang}</h2>
              <textarea {...register(`StartCode.${index}.initialcode`)} className="textarea textarea-bordered w-full bg-gray-800 text-white h-28" />
              <textarea {...register(`referenceSolution.${index}.completeCode`)} className="textarea textarea-bordered w-full bg-gray-800 text-white h-28 mt-2" />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full text-lg">
            Update Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateform;
