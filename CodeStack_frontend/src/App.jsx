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
import AdminUpdateform from "./components/Adminupdateform";
import Profilepage from "./page/Profilepage";
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
        <Route path="/admin/update/form/:id" element={<AdminUpdateform/>}/>
        <Route path="/profile" element={<Profilepage/>}/>
      </Routes>


    </>
  )
}
export default App