import React from "react"
import { RouterProvider } from "react-router-dom"
import { privateRoutes, publicRoutes, recruiterRoutes } from "./routes/router"
import { useSelector } from "react-redux";

function App() {
    let routes = publicRoutes;
    const role = useSelector(state => state?.user?.data?.role);
    const isLogin = useSelector(state => state?.user?.isLogin);
    if (!isLogin) {
      routes = publicRoutes
    } else if (role === 'student') {
      routes = privateRoutes
    } else if (role === 'recruiter') {
      routes = recruiterRoutes
    }    

  return (
    <>
     <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
