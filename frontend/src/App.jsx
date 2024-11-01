import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup.jsx";
import { Toaster } from "react-hot-toast";
import Shop from "./Shop.jsx";
import Profile from "./Profile.jsx";
import { useSelector } from "react-redux";
import Footer from "./Footer.jsx";
function App() {
  const islogged = useSelector((state) => state.isLogged.value);
  const router = createBrowserRouter([
    {
      path: "/",
      element: [<Navbar />, <Body />, <Footer />],
    },
    {
      path: "/login",
      element: [<Login />, <Footer />],
    },
    {
      path: "/signup",
      element: [<Signup />, <Footer />],
    },
    {
      path: "/shop/:id",
      element: [<Navbar />, <Shop />, <Footer />],
    },
    {
      path: "/profile",
      element: [<Navbar />, <Profile />, <Footer />],
      loader: async () => {
        if (!islogged) return redirect("/login");
        return null;
      },
    },
  ]);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
