import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/HomePage/Home";
import AboutUs from "../Pages/HomePage/AboutUs";
import AboutUsPage from "../Pages/AboutPage/AboutUsPage";
import ContactUs from "../Pages/ContactUsPage/ContactUs";
import Login from "../Pages/LoginPage/Login";
import Register from "../Pages/RegisterPage/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddProject from "../Pages/Dashboard/AddProject";
import AdminProjects from "../Pages/Dashboard/AdminProjects";
import AddTestimonial from "../Pages/Dashboard/AddTestimonial";
import AdminTestimonials from "../Pages/Dashboard/AdminTestimonials";
import AddTeam from "../Pages/Dashboard/AddTeam";
import AdminTeam from "../Pages/Dashboard/AdminTeam";
import Service from "../Pages/ServicesPage/Services";
import LatestProjects from "../Pages/ProjectsPage/LatestProjects";

const router = createBrowserRouter ([
    {
        path:'/',
        Component:RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/about',
                Component:AboutUsPage
            },
            {
                path: '/contact-us',
                Component: ContactUs
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/register',
                Component: Register
            },
            {
                path: '/services',
                Component: Service
            },
            {
                path: '/projects',
                Component: LatestProjects
            }
        ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'add-projects',
                Component: AddProject
            },
            {
                path:'admin/projects',
                Component: AdminProjects
            },
            {
                path: 'add-testimonials',
                Component: AddTestimonial
            },
            {
                path: 'admin/testimonials',
                Component: AdminTestimonials
            },
            {
                path: 'add-team',
                Component: AddTeam
            },
            {
                path: 'admin/team',
                Component: AdminTeam
            }
        ]
    }
])

export default router