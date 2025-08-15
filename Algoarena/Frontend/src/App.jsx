import { Routes, Route, Navigate } from "react-router";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { checkAuth } from "./authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import ProblemPage from "./page/ProblemPage";
import AdminPage from "./page/AdminPage";
import AdminDelete from "./components/AdminDelete";
import AdminCreate from "./components/AdminCreate";
import AdminUpdate from "./components/AdminUpdate";
import AdminSignUp from "./components/AdminSignUp";
import AdminDeletePage from "./components/AdminDeletePage";
import ComingSoon from "./page/ComingSoon";
function App() {

  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  console.log(isAuthenticated);
  console.log(user);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      {/* <span className="loading loading-spinner loading-lg"></span> */}
      <span className="loading loading-dots loading-lg"></span>
    </div>
  }

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signup" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        <Route path="/coming" element={<ComingSoon />} />
        {/* <Route path="/admin" element={<AdminPanel/>}/> */}




        
        <Route path="/adminpage" element={
          isAuthenticated && user?.role === "admin" ?
            <AdminPage /> :
            <Navigate to="/" />
        } />













        <Route path="/problem/:problemId" element={<ProblemPage />} />
        <Route path="/admin/delete" element={<AdminDelete />}></Route>
        <Route path="/admin/create" element={<AdminCreate />}></Route>
        <Route path="/admin/update" element={<AdminUpdate />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/delete/user" element={<AdminDeletePage />} />
      </Routes>


    </>
  )
}

export default App

//       // <footer className="bg-slate-800 text-gray-300 ">
//       //   <div className="max-w-7xl mx-auto px-6 py-1 flex flex-col md:flex-row justify-between items-center gap-4">

//       //     {/* Left: Copyright Info */}
//       //     <p className="text-sm text-center md:text-left">
//       //       © 2025 <span className="font-semibold">Shubham Kr  </span>. All rights reserved.
//       //     </p>
//       //     {/* Right: Links */}
//       //     <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
//       //       <a href="#" className="hover:text-blue-400 transition">Help Center</a>
//       //       <a href="#" className="hover:text-blue-400 transition">Terms</a>
//       //       <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
//       //     </div>
//       //   </div>
//       // </footer>
// import { Routes, Route, Navigate } from "react-router";
// import Home from "./page/Home";
// import Login from "./page/Login";
// import Signup from "./page/Signup";
// import { checkAuth } from "./authSlice"
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from "react";
// import ProblemPage from "./page/ProblemPage";
// import AdminPage from "./page/AdminPage";
// import AdminDelete from "./components/AdminDelete";
// import AdminCreate from "./components/AdminCreate";
// import AdminUpdate from "./components/AdminUpdate";
// import AdminSignUp from "./components/AdminSignUp";
// import AdminDeletePage from "./components/AdminDeletePage";
// import ComingSoon from "./page/ComingSoon";
// function App() {

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(checkAuth())
//   }, [dispatch])

//   console.log(isAuthenticated);
//   console.log(user);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">
//       {/* <span className="loading loading-spinner loading-lg"></span> */}
//       <span className="loading loading-dots loading-lg"></span>
//     </div>
//   }

//   return (
//     <>


// firstName
// id
// email
// role

//       {isAuthenticated}






//       const {isAuthenticated, user, loading} = useSelector((state) => state.auth)

//       <Routes>
//         <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signup" />} />
//         <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
//         <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
//         <Route path="/coming" element={<ComingSoon />} />
//         {/* <Route path="/admin" element={<AdminPanel/>}/> */}
//         <Route path="/adminpage" element={
//           isAuthenticated && user?.role === "admin" ?
//             <AdminPage /> :
//             <Navigate to="/" />
//         } />
// ==========================================================================================================
// function HomePage() {
//   return (
//     <div className="overflow-x-hidden">
//       <Navigation />
//       <div className="mt-4 px-4">
//         <MainCarousel />
//       </div>
//       <CategoryScroll />
//       <ElectronicsSection />
//       <BeautyFoodToysSection />
//       <HealthWellnessSection />
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/category/:name" element={<CategoryPage />} /> */}
//         <Route path="/category/:name" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




















//         <Route path="/problem/:problemId" element={<ProblemPage />} />
//         <Route path="/admin/delete" element={<AdminDelete />}></Route>
//         <Route path="/admin/create" element={<AdminCreate />}></Route>
//         <Route path="/admin/update" element={<AdminUpdate />} />
//         <Route path="/admin/signup" element={<AdminSignUp />} />
//         <Route path="/admin/delete/user" element={<AdminDeletePage />} />
//       </Routes>


//     </>
//   )
// }

// export default App

// // <footer className="bg-slate-800 text-gray-300 ">
// //   <div className="max-w-7xl mx-auto px-6 py-1 flex flex-col md:flex-row justify-between items-center gap-4">

// //     {/* Left: Copyright Info */}
// //     <p className="text-sm text-center md:text-left">
// //       © 2025 <span className="font-semibold">Shubham Kr  </span>. All rights reserved.
// //     </p>
// //     {/* Right: Links */}
// //     <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
// //       <a href="#" className="hover:text-blue-400 transition">Help Center</a>
// //       <a href="#" className="hover:text-blue-400 transition">Terms</a>
// //       <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
// //     </div>
// //   </div>
// // </footer>