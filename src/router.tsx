import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login_Signup from "./pages/Login_Signup";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login-signup",
        element: <Login_Signup />,
    },
    {
        path: "/details",
        element: <UserDetails />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
]);

export default router