import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Zod Schema
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

function AdminPanel() {
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
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
                { language: 'c++', initialcode: '//write Code Here' },
                { language: 'java', initialcode: '//write Code Here' },
                { language: 'javaScript', initialcode: '//write Code Here' }
            ],
            referenceSolution: [
                { language: 'c++', completeCode: '' },
                { language: 'java', completeCode: '' },
                { language: 'javaScript', completeCode: '' }
            ]
        }
    });

    const { fields: visibleFields, append: addVisible, remove: removeVisible } = useFieldArray({
        control,
        name: 'visibletestcases'
    });

    const { fields: hiddenFields, append: addHidden, remove: removeHidden } = useFieldArray({
        control,
        name: 'hiddentestcases'
    });

    const onSubmit = async (data) => {
        try {
            // console.log("data\n\n\n\n"+data.code);
            const res = await axiosClient.post('/problem/create', data);

            alert('Problem created!');
            navigate('/adminpage');
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };
    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <div className="flex items-center justify-between px-6 py-4 bg-black/20 shadow-md rounded-xl mb-6 w-full flex-wrap gap-y-4">

                {/* Left Section - Navigation + Title */}

                {user?.role === 'admin' ? (
                    <NavLink
                        to="/adminpage"
                        className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition"
                    >
                        Admin Panel
                    </NavLink>
                ) : (
                    <NavLink
                        to="/"
                        className="text-base font-semibold uppercase text-gray-100 hover:text-blue-600 hover:underline transition"
                    >
                        Home
                    </NavLink>
                )}

                <h1 className="text-xl md:text-2xl font-bold uppercase text-gray-100">
                    Create Coding Problem
                </h1>


                {/* Right Section - User Info */}
                <div className="text-right">
                    <h2 className="text-md md:text-lg font-semibold text-gray-100">
                        Welcome, <span className="uppercase text-blue-600">{user?.firstName || 'Admin'}</span>
                    </h2>
                    <p className="text-sm text-gray-100">{user?.emailId || ' '}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title & Description */}
                    <div>
                        <input {...register("title")} placeholder="Title Of The Question" className="input input-bordered w-full" />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <div>
                        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full h-24" />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>

                    {/* Dropdowns */}
                    <div className="flex gap-4">
                        <select {...register("difficulty")} className="select select-bordered">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <select {...register("tags")} className="select select-bordered">
                            <option value="array">Array</option>
                            <option value="linkedlist">Linked List</option>
                            <option value="graph">Graph</option>
                            <option value="dp">DP</option>
                        </select>
                    </div>

                    {/* Visible Test Cases */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Visible Test Cases</h2>
                        {visibleFields.map((field, index) => (
                            <div key={field.id} className="mb-4 space-y-2">
                                <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
                                <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
                                <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full" />
                                <button type="button" onClick={() => removeVisible(index)} className="btn btn-sm btn-error">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm btn-primary">Add Visible Case</button>
                    </div>

                    {/* Hidden Test Cases */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Hidden Test Cases</h2>
                        {hiddenFields.map((field, index) => (
                            <div key={field.id} className="mb-4 space-y-2">
                                <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
                                <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
                                <button type="button" onClick={() => removeHidden(index)} className="btn btn-sm btn-error">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addHidden({ input: '', output: '' })} className="btn btn-sm btn-primary">Add Hidden Case</button>
                    </div>

                    {/* Start Code & Reference Solution */}
                    {[0, 1, 2].map((index) => (
                        <div key={index}>
                            <h2 className="text-lg font-semibold">{['C++', 'Java', 'JavaScript'][index]}</h2>
                            <textarea {...register(`StartCode.${index}.initialcode`)} placeholder="Starter code or hint for users (required)" className="textarea textarea-bordered w-full h-28" />
                            <textarea {...register(`referenceSolution.${index}.completeCode`)} placeholder="Reference solution (full code required)" className="textarea textarea-bordered w-full h-28" />
                        </div>
                    ))}

                    <button type="submit" className="btn btn-primary w-full">Create Problem</button>
                </form>
            </div>
        </div>
    );
}

export default AdminPanel;
// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { useNavigate } from 'react-router-dom';

// // Zod Schema
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
//             language: z.enum(['c++', 'java', 'c']),
//             initialcode: z.string().min(1),
//         })
//     ).length(3),
//     referenceSolution: z.array(
//         z.object({
//             language: z.enum(['c++', 'java', 'c']),
//             completeCode: z.string().min(1),
//         })
//     ).length(3),
// });

// function AdminPanel() {
//     const navigate = useNavigate();

//     const {
//         register,
//         control,
//         handleSubmit,
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
//                 { language: 'c++', initialcode: '' },
//                 { language: 'java', initialcode: '' },
//                 { language: 'c', initialcode: '' }
//             ],
//             referenceSolution: [
//                 { language: 'c++', completeCode: '' },
//                 { language: 'java', completeCode: '' },
//                 { language: 'c', completeCode: '' }
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

//     const onSubmit = async (data) => {
//         try {
//             const res = await axiosClient.post('/problem/create', data);
//             alert('Problem created!');
//             navigate('/');
//         } catch (error) {
//             console.error(error.response?.data || error.message);
//             alert('Error: ' + (error.response?.data?.message || error.message));
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto py-10">
//             <h1 className="text-2xl font-bold mb-6">Create Coding Problem</h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {/* Title & Description */}
//                 <div>
//                     <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
//                     {errors.title && <p className="text-red-500">{errors.title.message}</p>}
//                 </div>
//                 <div>
//                     <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full h-24" />
//                     {errors.description && <p className="text-red-500">{errors.description.message}</p>}
//                 </div>

//                 {/* Dropdowns */}
//                 <div className="flex gap-4">
//                     <select {...register("difficulty")} className="select select-bordered">
//                         <option value="easy">Easy</option>
//                         <option value="medium">Medium</option>
//                         <option value="hard">Hard</option>
//                     </select>
//                     <select {...register("tags")} className="select select-bordered">
//                         <option value="array">Array</option>
//                         <option value="linkedlist">Linked List</option>
//                         <option value="graph">Graph</option>
//                         <option value="dp">DP</option>
//                     </select>
//                 </div>

//                 {/* Visible Test Cases */}
//                 <div>
//                     <h2 className="text-lg font-semibold mb-2">Visible Test Cases</h2>
//                     {visibleFields.map((field, index) => (
//                         <div key={field.id} className="mb-4 space-y-2">
//                             <input {...register(`visibletestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
//                             <input {...register(`visibletestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
//                             <textarea {...register(`visibletestcases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered w-full" />
//                             <button type="button" onClick={() => removeVisible(index)} className="btn btn-sm btn-error">Remove</button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={() => addVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm btn-primary">Add Visible Case</button>
//                 </div>

//                 {/* Hidden Test Cases */}
//                 <div>
//                     <h2 className="text-lg font-semibold mb-2">Hidden Test Cases</h2>
//                     {hiddenFields.map((field, index) => (
//                         <div key={field.id} className="mb-4 space-y-2">
//                             <input {...register(`hiddentestcases.${index}.input`)} placeholder="Input" className="input input-bordered w-full" />
//                             <input {...register(`hiddentestcases.${index}.output`)} placeholder="Output" className="input input-bordered w-full" />
//                             <button type="button" onClick={() => removeHidden(index)} className="btn btn-sm btn-error">Remove</button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={() => addHidden({ input: '', output: '' })} className="btn btn-sm btn-primary">Add Hidden Case</button>
//                 </div>

//                 {/* Start Code & Reference Solution */}
//                 {[0, 1, 2].map((index) => (
//                     <div key={index}>
//                         <h2 className="text-lg font-semibold">{['C++', 'Java', 'javascript'][index]}</h2>
//                         <textarea {...register(`StartCode.${index}.initialcode`)} placeholder="Initial Code" className="textarea textarea-bordered w-full h-28" />
//                         <textarea {...register(`referenceSolution.${index}.completeCode`)} placeholder="Reference Solution" className="textarea textarea-bordered w-full h-28" />
//                     </div>
//                 ))}

//                 <button type="submit" className="btn btn-primary w-full">Create Problem</button>
//             </form>
//         </div>
//     );
// }

// export default AdminPanel;