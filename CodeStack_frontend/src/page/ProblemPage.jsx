// import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router';
// import axiosClient from "../utils/axiosClient"
// import SubmissionHistory from "../components/SubmissionHistory"
// import { useSelector } from 'react-redux';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// const langMap = {
//   cpp: 'c++',
//   java: 'java',
//   javascript: 'javaScript'
// };


// const ProblemPage = () => {
//   const [problem, setProblem] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeLeftTab, setActiveLeftTab] = useState('description');
//   const [activeRightTab, setActiveRightTab] = useState('code');
//   const [editor_theme, set_editor_theme] = useState('vs-dark')
//   const { user } = useSelector((state) => state.auth);
//   const editorRef = useRef(null);
//   let { problemId } = useParams();


//   const { handleSubmit } = useForm();

//   useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {

//         const response = await axiosClient.get(`/problem/problemById/${problemId}`);
//         const initialcode = response.data.StartCode.find(sc => sc.language === langMap[selectedLanguage]).initialcode;
//         setProblem(response.data);
//         setCode(initialcode);
//         setLoading(false);

//       } catch (error) {
//         console.error('Error fetching problem:', error);
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId]);
//   useEffect(() => {
//     if (problem) {
//       const initialcode = problem.StartCode.find(sc => sc.language === langMap[selectedLanguage]).initialcode;
//       setCode(initialcode);
//     }
//   }, [selectedLanguage, problem]);

//   const handleEditorChange = (value) => {
//     setCode(value || '');
//   };

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     console.log(language + "language");

//   };

//   const handleRun = async () => {
//     setLoading(true);
//     setRunResult(null);

//     try {
//       const response = await axiosClient.post(`/submission/run/${problemId}`, {
//         code,
//         language: selectedLanguage
//       });

//       setRunResult(response.data);
//       setLoading(false);
//       setActiveRightTab('testcase');

//     } catch (error) {
//       console.error('Error running code:', error);
//       setRunResult({
//         success: false,
//         error: 'Internal server error'
//       });
//       setLoading(false);
//       setActiveRightTab('testcase');
//     }
//   };

//   const handleSubmitCode = async () => {
//     setLoading(true);
//     setSubmitResult(null);

//     try {
//       const response = await axiosClient.post(`/submission/submit/${problemId}`, {
//         code: code,
//         language: selectedLanguage
//       });
//       setSubmitResult(response.data);
//       setLoading(false);
//       setActiveRightTab('result');

//     } catch (error) {
//       console.error('Error submitting code:', error);
//       setSubmitResult(null);
//       setLoading(false);
//       setActiveRightTab('result');
//     }
//   };

//   const getLanguageForMonaco = (lang) => {
//     switch (lang) {
//       case 'javascript': return 'javascript';
//       case 'java': return 'java';
//       case 'cpp': return 'cpp';
//       default: return 'javascript';
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy': return 'text-green-500';
//       case 'medium': return 'text-yellow-500';
//       case 'hard': return 'text-red-500';
//       default: return 'text-gray-500';
//     }
//   };

//   if (loading && !problem) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="sm:h-screen flex flex-col sm:flex-row bg-[#0f172a] ">
//       {/* Left Panel */}
//       <div className="sm:w-1/2 flex flex-col border-r border-base-300 bg-[#0f172a]">
//         {/* Left Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-6 py-2 rounded-xl shadow-sm flex gap-1">
//           <button
//             className={`tab 
//       text-sm font-medium tracking-wide transition-all duration-300
//       ${activeLeftTab === 'description'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveLeftTab('description')}
//           >
//             Description
//           </button>

//           <button
//             className={`tab 
//       text-sm font-medium tracking-wide transition-all duration-300
//       ${activeLeftTab === 'editorial'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveLeftTab('editorial')}
//           >
//             Editorial
//           </button>

//           <button
//             className={`tab 
//       text-sm font-medium tracking-wide transition-all duration-300
//       ${activeLeftTab === 'solutions'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveLeftTab('solutions')}
//           >
//             Solutions
//           </button>

//           <button
//             className={`tab 
//       text-sm font-medium tracking-wide transition-all duration-300
//       ${activeLeftTab === 'submissions'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveLeftTab('submissions')}
//           >
//             Submissions
//           </button>
//         </div>

//         {/* Left Content */}
//         <div className="flex-1 overflow-y-auto p-6 bg-[#0f172a] space-y-8 ">
//           {problem && (
//             <>
//               {/* DESCRIPTION TAB */}
//               {/* DESCRIPTION TAB */}
//               {activeLeftTab === 'description' && (
//                 <div className="space-y-10 ">
//                   {/* Title */}
//                   <div className="space-y-3">
//                     <h1 className="text-3xl italic uppercase  font-display  font-bold tracking-tight text-white leading-tight">
//                       {problem.title}
//                     </h1>

//                     {/* Meta Info */}
//                     <div className="flex flex-wrap items-center gap-3">
//                       <span
//                         className={`badge badge-outline text-xs font-semibold tracking-wide ${getDifficultyColor(problem.difficulty)}`}
//                       >
//                         {problem.difficulty.charAt(0).toUpperCase() +
//                           problem.difficulty.slice(1)}
//                       </span>

//                       <span className="badge badge-outline uppercase text-xs tracking-widest">
//                         {problem.tags}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="rounded-2xl border border-base-300 bg-gradient-to-br from-base-100 to-base-300 p-6 shadow-sm">
//                     <p className="text-[11px] uppercase font-semibold tracking-widest text-gray-400 mb-3">
//                       Problem Description
//                     </p>

//                     <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200 font-medium">
//                       {problem.description}
//                     </div>
//                   </div>

//                   {/* Examples */}
//                   <div className="space-y-5">
//                     <h3 className="text-xl font-display font-semibold text-white tracking-tight">
//                       Examples
//                     </h3>

//                     {problem.visibletestcases.map((example, index) => (
//                       <div
//                         key={index}
//                         className="rounded-2xl border border-base-300 bg-gradient-to-br from-base-100 to-base-300 p-5 space-y-4 shadow-sm"
//                       >
//                         <h4 className="font-display font-semibold text-sm text-primary tracking-wide">
//                           Example {index + 1}
//                         </h4>

//                         <div className="text-sm font-mono space-y-3">
//                           <div>
//                             <span className="text-gray-400">Input:</span>{' '}
//                             <span className="text-gray-100">{example.input}</span>
//                           </div>

//                           <div>
//                             <span className="text-gray-400">Output:</span>{' '}
//                             <span className="text-gray-100">{example.output}</span>
//                           </div>

//                           <div>
//                             <span className="text-gray-400">Explanation:</span>{' '}
//                             <span className="text-gray-100 leading-relaxed">
//                               {example.explanation}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}


//               {/* EDITORIAL TAB */}
//               {activeLeftTab === 'editorial' && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-bold text-white">
//                     Editorial
//                   </h2>

//                   <div className="rounded-lg border border-base-300 bg-[#020617] p-5">
//                     <div className="  whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
//                       {'Editorial is here for the problem'}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* SOLUTIONS TAB */}
//               {activeLeftTab === 'solutions' &&
//                 (user?.plans === 'premium' ? (
//                   <div className="space-y-10 ">
//                     {/* Header */}
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-2xl font-bold font-display tracking-tight text-white">
//                         Solutions
//                       </h2>

//                       <span className="badge badge-success badge-outline text-xs font-semibold tracking-wide">
//                         PREMIUM
//                       </span>
//                     </div>

//                     {problem.referenceSolution?.length > 0 ? (
//                       problem.referenceSolution.map((solution, index) => (
//                         <div
//                           key={index}
//                           className="rounded-2xl bg-[#020617] border border-base-300 overflow-hidden shadow-md"
//                         >
//                           {/* Solution Header */}
//                           <div className="flex items-center justify-between bg-gradient-to-r from-base-200 to-base-300 px-5 py-3">
//                             <h3 className="font-display font-semibold text-sm text-white tracking-wide">
//                               {problem?.title}
//                               <span className="mx-2 text-gray-400">•</span>
//                               <span className="text-primary">
//                                 {solution?.language}
//                               </span>
//                             </h3>

//                             <span className="badge badge-outline text-xs font-medium">
//                               Reference
//                             </span>
//                           </div>

//                           {/* Code Block */}
//                           <div className=" p-5">
//                             <pre className="text-sm font-mono leading-relaxed overflow-x-auto rounded-xl text-gray-200">
//                               <code>{solution?.completeCode}</code>
//                             </pre>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="rounded-xl border border-base-300 bg-base-200 p-6 text-center">
//                         <p className="text-gray-400 text-sm font-medium">
//                           No solutions available yet.
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center space-y-3">
//                     <p className="text-lg font-display font-semibold text-gray-200">
//                       Premium Content Locked 🔒
//                     </p>
//                     <p className="text-gray-400 text-sm leading-relaxed">
//                       Upgrade your plan to unlock high-quality reference solutions.
//                     </p>
//                   </div>
//                 ))}


//               {/* SUBMISSIONS TAB */}
//               {activeLeftTab === 'submissions' && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-bold text-white">
//                     My Submissions
//                   </h2>

//                   <div className="rounded-lg border border-base-300 bg-base-200 p-4">
//                     <SubmissionHistory problemId={problemId} />
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* left panel over */}
//       </div>

//       {/* Right Panel */}
//       <div className="sm:w-1/2 h-full flex flex-col overflow-hidden">

//         {/* ================= RIGHT TABS ================= */}
//         <div className="shrink-0 tabs tabs-bordered bg-base-200 px-5 py-2 shadow-sm flex gap-1">
//           <button
//             className={`tab text-sm font-semibold transition
//         ${activeRightTab === 'code'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveRightTab('code')}
//           >
//             Code
//           </button>

//           <button
//             className={`tab text-sm font-semibold transition
//         ${activeRightTab === 'testcase'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveRightTab('testcase')}
//           >
//             Testcase
//           </button>

//           <button
//             className={`tab text-sm font-semibold transition
//         ${activeRightTab === 'result'
//                 ? 'tab-active text-primary border-primary'
//                 : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
//               }`}
//             onClick={() => setActiveRightTab('result')}
//           >
//             Result
//           </button>
//         </div>

//         {/* ================= RIGHT CONTENT ================= */}
//         <div className="flex-1 flex flex-col overflow-hidden bg-[#0f172a] ">

//           {/* ================= CODE TAB ================= */}
//           {activeRightTab === 'code' && (
//             <div className="flex-1 flex flex-col sm:overflow-hidden bg-base-100 rounded-xl shadow-lg">

//               {/* Toolbar */}
//               <div className="shrink-0 flex items-center justify-between px-5 py-3 bg-base-200 border-b border-base-300">
//                 <div className="flex gap-2">
//                   {['cpp', 'java', 'javascript'].map((lang) => (
//                     <button
//                       key={lang}
//                       className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
//                   ${selectedLanguage === lang
//                           ? 'bg-primary text-white'
//                           : 'text-gray-400 hover:text-white hover:bg-base-300'
//                         }`}
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang === 'cpp' ? 'C++' : lang}
//                     </button>
//                   ))}
//                 </div>

//                 <select
//                   name="editor_theme"
//                   className="select select-sm bg-base-300 text-white"
//                   onChange={(e) => set_editor_theme(e.target.value)}
//                 >
//                   <option value="vs-dark">Dark</option>
//                   <option value="vs-light">Light</option>
//                   <option value="hc-black">High Contrast</option>
//                 </select>
//               </div>

//               {/* Editor Area (LOCKED HEIGHT) */}
//               <div className="flex-1 h-auto overflow-hidden bg-[#0b1220]">
//                 <Editor
//                   height="100%"
//                   language={getLanguageForMonaco(selectedLanguage)}
//                   value={code}
//                   onChange={handleEditorChange}
//                   onMount={handleEditorDidMount}
//                   theme={editor_theme}
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     tabSize: 2,
//                     insertSpaces: true,
//                     wordWrap: 'on',
//                     lineNumbers: 'on',
//                     renderLineHighlight: 'line',
//                     cursorStyle: 'line',
//                     mouseWheelZoom: true,
//                   }}
//                 />
//               </div>

//               {/* Bottom Action Bar */}
//               <div className="shrink-0 px-5 py-3 bg-base-200 border-t border-base-300 flex justify-between items-center">
//                 <button
//                   className="text-xs text-gray-400 hover:text-white"
//                   onClick={() => setActiveRightTab('testcase')}
//                 >
//                   Open Console →
//                 </button>

//                 <div className="flex gap-2">
//                   <button
//                     className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleRun}
//                     disabled={loading}
//                   >
//                     Run
//                   </button>

//                   <button
//                     className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleSubmitCode}
//                     disabled={loading}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ================= TESTCASE TAB ================= */}
//           {activeRightTab === 'testcase' && (
//             <div className=" bg-[#111b31]  flex-1 flex flex-col overflow-hidden  rounded-2xl shadow-xl p-6">

//               {/* Header (Fixed) */}
//               <div className="shrink-0 mb-4">
//                 <h3 className="font-display font-bold text-xl tracking-tight text-white">
//                   Test Results
//                 </h3>
//               </div>

//               {/* Scrollable Content ONLY */}
//               <div className="flex-1 overflow-y-auto pr-2 space-y-4">

//                 {runResult ? (
//                   <div
//                     className={`rounded-2xl border border-base-300 p-5 shadow-sm
//             ${runResult.success
//                         ? 'bg-gradient-to-br from-success/10 to-success/5'
//                         : 'bg-gradient-to-br from-error/10 to-error/5'
//                       }`}
//                   >
//                     {runResult.success ? (
//                       <div className="space-y-6">

//                         {/* Success Summary */}
//                         <div>
//                           <h4 className="font-display font-bold text-success text-2xl tracking-tight">
//                             ✅ All Test Cases Passed
//                           </h4>

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
//                             <div className="rounded-lg bg-base-200 px-4 py-3 text-center">
//                               <p className="text-xs text-gray-400">Runtime</p>
//                               <p className="font-semibold text-white">
//                                 {runResult.runtime} sec
//                               </p>
//                             </div>

//                             <div className="rounded-lg bg-base-200 px-4 py-3 text-center">
//                               <p className="text-xs text-gray-400">Memory</p>
//                               <p className="font-semibold text-white">
//                                 {runResult.memory} KB
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Testcase List (SCROLLS INTERNALLY) */}
//                         <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div
//                               key={i}
//                               className="bg-base-200 border border-base-300 p-4 rounded-xl text-xs"
//                             >
//                               <div className="font-mono space-y-1 text-gray-200">
//                                 <div>
//                                   <span className="text-gray-400">Input:</span> {tc.stdin}
//                                 </div>
//                                 <div>
//                                   <span className="text-gray-400">Expected:</span> {tc.expected_output}
//                                 </div>
//                                 <div>
//                                   <span className="text-gray-400">Output:</span> {tc.stdout}
//                                 </div>
//                                 <div className="text-green-400 font-semibold mt-1">
//                                   ✓ Passed
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {/* Testing Code */}
//                         <div className="space-y-2">
//                           <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
//                             Testing Code
//                           </h2>

//                           {/* Code Scroll (HEIGHT LIMITED) */}
//                           <div className="rounded-2xl overflow-hidden border border-base-300 max-h-[40vh] shadow-inner">
//                             <SyntaxHighlighter
//                               language="javascript"
//                               style={vscDarkPlus}
//                               wrapLongLines={true}
//                             >
//                               {runResult.testCases[0].source_code}
//                             </SyntaxHighlighter>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">

//                         {/* Failure Header */}
//                         <h4 className="font-display font-bold text-error text-2xl">
//                           ❌ Test Cases Failed
//                         </h4>

//                         {/* Failed Testcases (SCROLLABLE) */}
//                         <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div
//                               key={i}
//                               className="bg-base-200 border border-base-300 p-4 rounded-xl text-xs"
//                             >
//                               <div className="font-mono space-y-1">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div
//                                   className={`font-semibold mt-1 ${tc.status_id == 3
//                                       ? 'text-green-400'
//                                       : 'text-red-400'
//                                     }`}
//                                 >
//                                   {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-400 text-sm">
//                     Click <span className="mx-1 font-semibold text-white">Run</span> to test your code with example test cases.
//                   </div>
//                 )}

//               </div>
//             </div>
//           )}


//           {/* ================= RESULT TAB ================= */}
//           {activeRightTab === 'result' && (
//             <div className="flex-1 flex flex-col overflow-hidden bg-[#111b31]  rounded-2xl shadow-xl p-6">

//               {/* Header */}
//               <div className="shrink-0 mb-4 flex items-center justify-between">
//                 <h3 className="font-display font-bold text-xl tracking-tight text-white">
//                   Submission Result
//                 </h3>
//               </div>

//               {/* Scrollable Content */}
//               <div className="flex-1 overflow-y-auto pr-2 space-y-4">

//                 {submitResult ? (
//                   <div
//                     className={`rounded-2xl border border-base-300 p-5 shadow-sm
//             ${submitResult.accepted === true
//                         ? 'bg-gradient-to-br from-success/10 to-success/5'
//                         : submitResult.accepted === false
//                           ? 'bg-gradient-to-br from-error/10 to-error/5'
//                           : 'bg-gradient-to-br from-info/10 to-info/5'
//                       }`}
//                   >
//                     {submitResult.accepted ? (
//                       <div className="space-y-6">

//                         {/* Meta Info */}
//                         <div className="flex flex-col gap-2 text-sm text-gray-300">
//                           <div className="flex flex-wrap items-center gap-2">
//                             <span className="font-medium text-white">
//                               {user?.firstName}
//                             </span>
//                             <span className="text-gray-400">submitted at</span>
//                             <span className="text-gray-400">
//                               {new Date().toLocaleString()}
//                             </span>
//                           </div>

//                           <h4 className="font-display font-bold text-success text-2xl tracking-tight">
//                             🎉 Accepted
//                           </h4>

//                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
//                             <div className="rounded-lg bg-base-200 px-3 py-2 text-center">
//                               <p className="text-xs text-gray-400">Testcases</p>
//                               <p className="font-semibold text-white">
//                                 {submitResult.passedTestCases}/{submitResult.testCasesTotal}
//                               </p>
//                             </div>
//                             <div className="rounded-lg bg-base-200 px-3 py-2 text-center">
//                               <p className="text-xs text-gray-400">Runtime</p>
//                               <p className="font-semibold text-white">
//                                 {submitResult.runtime}s
//                               </p>
//                             </div>
//                             <div className="rounded-lg bg-base-200 px-3 py-2 text-center">
//                               <p className="text-xs text-gray-400">Memory</p>
//                               <p className="font-semibold text-white">
//                                 {submitResult.memory} KB
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Submitted Code */}
//                         <div className="space-y-2">
//                           <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
//                             Submitted Code
//                           </h2>

//                           <div className="rounded-2xl overflow-hidden border border-base-300 max-h-[60vh] shadow-inner">
//                             <SyntaxHighlighter
//                               language="javascript"
//                               style={vscDarkPlus}
//                               wrapLongLines={true}
//                             >
//                               {submitResult.source_code}
//                             </SyntaxHighlighter>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         <h4 className="font-display font-bold text-error text-2xl">
//                           ❌ {submitResult.error}
//                         </h4>

//                         <div className="rounded-lg bg-base-200 px-4 py-3 text-sm text-gray-300">
//                           Test Cases Passed:{' '}
//                           <span className="font-semibold text-white">
//                             {submitResult.passedTestCases}/{submitResult.totalTestCases}
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-400 text-sm">
//                     Click <span className="mx-1 font-semibold text-white">Submit</span> to evaluate your solution.
//                   </div>
//                 )}

//               </div>
//             </div>
//           )}


//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProblemPage;

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const langMap = {
  cpp: 'c++',
  java: 'java',
  javascript: 'javaScript'
};


const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [editor_theme, set_editor_theme] = useState('vs-dark')
  const { user } = useSelector((state) => state.auth);
  const editorRef = useRef(null);
  let { problemId } = useParams();


  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {

        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialcode = response.data.StartCode.find(sc => sc.language === langMap[selectedLanguage]).initialcode;
        setProblem(response.data);
        setCode(initialcode);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);
  useEffect(() => {
    if (problem) {
      const initialcode = problem.StartCode.find(sc => sc.language === langMap[selectedLanguage]).initialcode;
      setCode(initialcode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    console.log(language + "language");

  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');

    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');

    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="sm:h-screen flex flex-col sm:flex-row bg-[#0f172a] ">
      {/* Left Panel */}
      <div className="sm:w-1/2 flex flex-col border-r border-base-300 bg-[#0f172a]">
        {/* Left Tabs */}
        <div className="tabs tabs-bordered bg-base-200 px-6 py-2 rounded-xl shadow-sm flex gap-1">
          <button
            className={`tab 
      text-sm font-medium tracking-wide transition-all duration-300
      ${activeLeftTab === 'description'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveLeftTab('description')}
          >
            Description
          </button>

          <button
            className={`tab 
      text-sm font-medium tracking-wide transition-all duration-300
      ${activeLeftTab === 'editorial'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveLeftTab('editorial')}
          >
            Editorial
          </button>

          <button
            className={`tab 
      text-sm font-medium tracking-wide transition-all duration-300
      ${activeLeftTab === 'solutions'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveLeftTab('solutions')}
          >
            Solutions
          </button>

          <button
            className={`tab 
      text-sm font-medium tracking-wide transition-all duration-300
      ${activeLeftTab === 'submissions'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveLeftTab('submissions')}
          >
            Submissions
          </button>
        </div>

        {/* Left Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0f172a] space-y-8 ">
          {problem && (
            <>
              {/* DESCRIPTION TAB */}
              {/* DESCRIPTION TAB */}
              {activeLeftTab === 'description' && (
                <div className="space-y-10 ">
                  {/* Title */}
                  <div className="space-y-3">
                    <h1 className="text-3xl italic uppercase  font-display  font-bold tracking-tight text-white leading-tight">
                      {problem.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`badge badge-outline text-xs font-semibold tracking-wide ${getDifficultyColor(problem.difficulty)}`}
                      >
                        {problem.difficulty.charAt(0).toUpperCase() +
                          problem.difficulty.slice(1)}
                      </span>

                      <span className="badge badge-outline uppercase text-xs tracking-widest">
                        {problem.tags}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="rounded-2xl border border-base-300 bg-gradient-to-br from-base-100 to-base-300 p-6 shadow-sm">
                    <p className="text-[11px] uppercase font-semibold tracking-widest text-gray-400 mb-3">
                      Problem Description
                    </p>

                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200 font-medium">
                      {problem.description}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="space-y-5">
                    <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                      Examples
                    </h3>

                    {problem.visibletestcases.map((example, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-base-300 bg-gradient-to-br from-base-100 to-base-300 p-5 space-y-4 shadow-sm"
                      >
                        <h4 className="font-display font-semibold text-sm text-primary tracking-wide">
                          Example {index + 1}
                        </h4>

                        <div className="text-sm font-mono space-y-3">
                          <div>
                            <span className="text-gray-400">Input:</span>{' '}
                            <span className="text-gray-100">{example.input}</span>
                          </div>

                          <div>
                            <span className="text-gray-400">Output:</span>{' '}
                            <span className="text-gray-100">{example.output}</span>
                          </div>

                          <div>
                            <span className="text-gray-400">Explanation:</span>{' '}
                            <span className="text-gray-100 leading-relaxed">
                              {example.explanation}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* EDITORIAL TAB */}
              {activeLeftTab === 'editorial' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white">
                    Editorial
                  </h2>

                  <div className="rounded-lg border border-base-300 bg-[#020617] p-5">
                    <div className="  whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                      {'Editorial is here for the problem'}
                    </div>
                  </div>
                </div>
              )}

              {/* SOLUTIONS TAB */}
              {activeLeftTab === 'solutions' &&
                (user?.plans === 'premium' ? (
                  <div className="space-y-10 ">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold font-display tracking-tight text-white">
                        Solutions
                      </h2>

                      <span className="badge badge-success badge-outline text-xs font-semibold tracking-wide">
                        PREMIUM
                      </span>
                    </div>

                    {problem.referenceSolution?.length > 0 ? (
                      problem.referenceSolution.map((solution, index) => (
                        <div
                          key={index}
                          className="rounded-2xl bg-[#020617] border border-base-300 overflow-hidden shadow-md"
                        >
                          {/* Solution Header */}
                          <div className="flex items-center justify-between bg-gradient-to-r from-base-200 to-base-300 px-5 py-3">
                            <h3 className="font-display font-semibold text-sm text-white tracking-wide">
                              {problem?.title}
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-primary">
                                {solution?.language}
                              </span>
                            </h3>

                            <span className="badge badge-outline text-xs font-medium">
                              Reference
                            </span>
                          </div>

                          {/* Code Block */}
                          <div className=" p-5">
                            <pre className="text-sm font-mono leading-relaxed overflow-x-auto rounded-xl text-gray-200">
                              <code>{solution?.completeCode}</code>
                            </pre>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-base-300 bg-base-200 p-6 text-center">
                        <p className="text-gray-400 text-sm font-medium">
                          No solutions available yet.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center space-y-3">
                    <p className="text-lg font-display font-semibold text-gray-200">
                      Premium Content Locked 🔒
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Upgrade your plan to unlock high-quality reference solutions.
                    </p>
                  </div>
                ))}


              {/* SUBMISSIONS TAB */}
              {activeLeftTab === 'submissions' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white">
                    My Submissions
                  </h2>

                  <div className="rounded-lg border border-base-300 bg-base-200 p-4">
                    <SubmissionHistory problemId={problemId} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* left panel over */}
      </div>

      {/* Right Panel */}
      <div className="sm:w-1/2 h-full flex flex-col overflow-hidden">

        {/* ================= RIGHT TABS ================= */}
        <div className="shrink-0 tabs rounded-xl tabs-bordered bg-base-200 px-5 py-2 shadow-sm flex gap-1">
          <button
            className={`tab text-sm font-semibold transition
        ${activeRightTab === 'code'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveRightTab('code')}
          >
            Code
          </button>

          <button
            className={`tab text-sm font-semibold transition
        ${activeRightTab === 'testcase'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveRightTab('testcase')}
          >
            Testcase
          </button>

          <button
            className={`tab text-sm font-semibold transition
        ${activeRightTab === 'result'
                ? 'tab-active text-primary border-primary'
                : 'text-gray-500 hover:text-primary hover:bg-base-300 rounded-lg'
              }`}
            onClick={() => setActiveRightTab('result')}
          >
            Result
          </button>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex-1 flex flex-col
  bg-[#0f172a]
  overflow-y-auto
  sm:overflow-hidden ">

          {/* ================= CODE TAB ================= */}
          {activeRightTab === 'code' && (
            <div className="
    flex flex-col
    flex-1
    h-full
    bg-[#0b1220]
    overflow-hidden
  ">

              {/* ===== Toolbar ===== */}
              <div className="
      shrink-0
      flex flex-wrap gap-2 items-center justify-between
      px-4 py-3
      bg-base-200
      border-b border-base-300
    ">
                <div className="flex gap-2 flex-wrap">
                  {['cpp', 'java', 'javascript'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
              ${selectedLanguage === lang
                          ? 'bg-primary text-white'
                          : 'text-gray-400 hover:text-white hover:bg-base-300'
                        }`}
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang === 'cpp' ? 'C++' : lang}
                    </button>
                  ))}
                </div>

                <select
                  name="editor_theme"
                  className="select select-sm bg-base-300 text-white"
                  onChange={(e) => set_editor_theme(e.target.value)}
                >
                  <option value="vs-dark">Dark</option>
                  <option value="vs-light">Light</option>
                  <option value="hc-black">High Contrast</option>
                </select>
              </div>

              {/* ===== EDITOR AREA (FIXED) ===== */}
              <div
                className="
        relative
        w-full
        bg-[#0b1220]
        overflow-hidden

        /* MOBILE */
        h-[calc(100vh-210px)]

        /* DESKTOP */
        sm:flex-1
        sm:h-auto
      "
              >
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme={editor_theme}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    renderLineHighlight: 'line',
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {/* ===== Bottom Bar ===== */}
              <div
                className="
        shrink-0
        px-4 py-3
        bg-base-200
        border-t border-base-300
        flex justify-between items-center

        sticky bottom-0 z-30
        sm:static
      "
              >
                <button
                  className="text-xs text-gray-400 hover:text-white"
                  onClick={() => setActiveRightTab('testcase')}
                >
                  Open Console →
                </button>

                <div className="flex gap-2">
                  <button
                    className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
                    onClick={handleRun}
                    disabled={loading}
                  >
                    Run
                  </button>

                  <button
                    className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
                    onClick={handleSubmitCode}
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </div>

            </div>
          )}


          {/* ================= TESTCASE TAB ================= */}
          {activeRightTab === 'testcase' && (
            <div className="flex-1 flex flex-col
      bg-[#111b31]
      overflow-hidden min-h-72 sm:h-auto
      rounded-2xl shadow-xl p-4">

              {/* Header (Fixed) */}
              <div className="shrink-0 mb-4">
                <h3 className="font-display font-bold text-xl tracking-tight text-white">
                  Test Results
                </h3>
              </div>

              {/* Scrollable Content ONLY */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">

                {runResult ? (
                  <div
                    className={`rounded-2xl border border-base-300 p-5 shadow-sm
            ${runResult.success
                        ? 'bg-gradient-to-br from-success/10 to-success/5'
                        : 'bg-gradient-to-br from-error/10 to-error/5'
                      }`}
                  >
                    {runResult.success ? (
                      <div className="space-y-6">

                        {/* Success Summary */}
                        <div>
                          <h4 className="font-display font-bold text-success text-2xl tracking-tight">
                            ✅ All Test Cases Passed
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                            <div className="rounded-lg bg-base-200 px-4 py-3 text-center">
                              <p className="text-xs text-gray-400">Runtime</p>
                              <p className="font-semibold text-white">
                                {runResult.runtime} sec
                              </p>
                            </div>

                            <div className="rounded-lg bg-base-200 px-4 py-3 text-center">
                              <p className="text-xs text-gray-400">Memory</p>
                              <p className="font-semibold text-white">
                                {runResult.memory} KB
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Testcase List (SCROLLS INTERNALLY) */}
                        <div className="space-y-3 max-h-[35vh] overflow-y-auto pr-2">
                          {runResult.testCases.map((tc, i) => (
                            <div
                              key={i}
                              className="bg-base-200 border border-base-300 p-4 rounded-xl text-xs"
                            >
                              <div className="font-mono space-y-1 text-gray-200">
                                <div>
                                  <span className="text-gray-400">Input:</span> {tc.stdin}
                                </div>
                                <div>
                                  <span className="text-gray-400">Expected:</span> {tc.expected_output}
                                </div>
                                <div>
                                  <span className="text-gray-400">Output:</span> {tc.stdout}
                                </div>
                                <div className="text-green-400 font-semibold mt-1">
                                  ✓ Passed
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Testing Code */}
                        <div className="space-y-2">
                          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                            Testing Code
                          </h2>

                          {/* Code Scroll (HEIGHT LIMITED) */}
                          <div className="rounded-2xl overflow-hidden border border-base-300 max-h-[40vh] shadow-inner">
                            <SyntaxHighlighter
                              language="javascript"
                              style={vscDarkPlus}
                              wrapLongLines={true}
                            >
                              {runResult.testCases[0].source_code}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">

                        {/* Failure Header */}
                        <h4 className="font-display font-bold text-error text-2xl">
                          ❌ Test Cases Failed
                        </h4>

                        {/* Failed Testcases (SCROLLABLE) */}
                        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                          {runResult.testCases.map((tc, i) => (
                            <div
                              key={i}
                              className="bg-base-200 border border-base-300 p-4 rounded-xl text-xs"
                            >
                              <div className="font-mono space-y-1">
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div
                                  className={`font-semibold mt-1 ${tc.status_id == 3
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                    }`}
                                >
                                  {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    Click <span className="mx-1 font-semibold text-white">Run</span> to test your code with example test cases.
                  </div>
                )}

              </div>
            </div>
          )}


          {/* ================= RESULT TAB ================= */}
          {activeRightTab === 'result' && (
            <div className="  flex-1 flex flex-col
  bg-[#111b31]
  overflow-y-auto min-h-72 sm:h-auto
  sm:overflow-hidden
  rounded-2xl shadow-xl p-6">

              {/* Header */}
              <div className="shrink-0 mb-4 flex items-center justify-between">
                <h3 className="font-display font-bold text-xl tracking-tight text-white">
                  Submission Result
                </h3>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">

                {submitResult ? (
                  <div
                    className={`rounded-2xl border border-base-300 p-5 shadow-sm
            ${submitResult.accepted === true
                        ? 'bg-gradient-to-br from-success/10 to-success/5'
                        : submitResult.accepted === false
                          ? 'bg-gradient-to-br from-error/10 to-error/5'
                          : 'bg-gradient-to-br from-info/10 to-info/5'
                      }`}
                  >
                    {submitResult.accepted ? (
                      <div className="space-y-6">

                        {/* Meta Info */}
                        <div className="flex flex-col gap-2 text-sm text-gray-300">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-white">
                              {user?.firstName}
                            </span>
                            <span className="text-gray-400">submitted at</span>
                            <span className="text-gray-400">
                              {new Date().toLocaleString()}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-success text-2xl tracking-tight">
                            🎉 Accepted
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                            <div className="rounded-lg bg-base-200 px-3 py-2 text-center">
                              <p className="text-xs text-gray-400">Testcases</p>
                              <p className="font-semibold text-white">
                                {submitResult.passedTestCases}/{submitResult.testCasesTotal}
                              </p>
                            </div>
                            <div className="rounded-lg bg-base-200 px-3 py-2 text-center">
                              <p className="text-xs text-gray-400">Runtime</p>
                              <p className="font-semibold text-white">
                                {submitResult.runtime}s
                              </p>
                            </div>
                            <div className="rounded-lg bg-base-200 px-3 py-2 text-center">
                              <p className="text-xs text-gray-400">Memory</p>
                              <p className="font-semibold text-white">
                                {submitResult.memory} KB
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Submitted Code */}
                        <div className="space-y-2">
                          <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                            Submitted Code
                          </h2>

                          <div className="rounded-2xl overflow-hidden border border-base-300 max-h-[60vh] shadow-inner">
                            <SyntaxHighlighter
                              language="javascript"
                              style={vscDarkPlus}
                              wrapLongLines={true}
                            >
                              {submitResult.source_code}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-display font-bold text-error text-2xl">
                          ❌ {submitResult.error}
                        </h4>

                        <div className="rounded-lg bg-base-200 px-4 py-3 text-sm text-gray-300">
                          Test Cases Passed:{' '}
                          <span className="font-semibold text-white">
                            {submitResult.passedTestCases}/{submitResult.totalTestCases}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    Click <span className="mx-1 font-semibold text-white">Submit</span> to evaluate your solution.
                  </div>
                )}

              </div>
            </div>
          )}


        </div>
      </div>

    </div>
  );
};

export default ProblemPage;

