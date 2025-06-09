import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import  Loader  from "../components/loader/loader";

const HomePage = lazy(()=> import("../pages/home/home"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const CategoryJobsPage = lazy(()=> import("../pages/category-jobs/category-jobs"));
const SignUpPage = lazy(() => import("../pages/auth/signup"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/forget-password"));
const OtpVerifyPage = lazy(() => import("../pages/auth/otp-verify"));
const ResetPasswordPage = lazy(() => import("../pages/auth/reset-password"));
const NotFoundPage = lazy(() => import("../pages/error/not-found"));
const StudentDetailsPage = lazy(() => import("../pages/student-details/student-details"));
const JobsWithFilter = lazy(() => import("../pages/jobs/jobs-with-filter"));
const JobsDetails = lazy(() => import("../pages/jobs/jobs-details"));
const SearchResult = lazy(() => import("../pages/search/search-result"));
const BrowseJobs = lazy(() => import("../pages/jobs/browse-jobs"));
const StudentProfile = lazy(() => import("../pages/profile/student-profile"));

const AddJob = lazy(() => import("../pages/recruiter/add-job"));
const AddCompany = lazy(() => import("../pages/recruiter/add-company"));
const CompaniesPage = lazy(() => import("../pages/recruiter/companies"));
const JobsPage = lazy(() => import("../pages/recruiter/jobs"));
const Applicants = lazy(() => import("../pages/recruiter/applicants"));

export const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense>,
    },
    {
        path: '/auth/login',
        element: <Suspense fallback={<Loader></Loader>}><LoginPage></LoginPage></Suspense>,
    },
    {
        path: '/auth/signup',
        element: <Suspense fallback={<Loader></Loader>}><SignUpPage></SignUpPage></Suspense>,
    },
    {
        path: '/auth/forgot-password',
        element: <Suspense fallback={<Loader/>}><ForgetPasswordPage></ForgetPasswordPage></Suspense>,
    },
    {
        path: '/auth/otp-verify',
        element: <Suspense fallback={<Loader></Loader>}><OtpVerifyPage></OtpVerifyPage></Suspense>,
    },
    {
        path: '/auth/reset-password',
        element: <Suspense fallback={<Loader></Loader>}><ResetPasswordPage></ResetPasswordPage></Suspense>,
    },
    {
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
    {
        path: '/jobs-with-filter',
        element: <Suspense fallback={<Loader></Loader>}><JobsWithFilter></JobsWithFilter></Suspense>,
    },
     {
        path: '/jobs-details/:id',
        element: <Suspense fallback={<Loader></Loader>}><JobsDetails></JobsDetails></Suspense>,
    },
    {
        path: '/jobs-category/:title',
        element: <Suspense fallback={<Loader></Loader>}><CategoryJobsPage></CategoryJobsPage></Suspense>,
    },
     {
        path: '/search-result',
        element: <Suspense fallback={<Loader></Loader>}><SearchResult></SearchResult></Suspense>,
    },
       {
        path: '/browse-jobs',
        element: <Suspense fallback={<Loader></Loader>}><BrowseJobs></BrowseJobs></Suspense>,
    },
       {
        path: '/profile/student',
        element: <Suspense fallback={<Loader></Loader>}><StudentProfile></StudentProfile></Suspense>,
    },
])

export const privateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense>,
    },
    {
        path: '/student-details',
        element: <Suspense fallback={<Loader></Loader>}><StudentDetailsPage></StudentDetailsPage></Suspense>,
    },
    {
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
    {
        path: '/jobs-with-filter',
        element: <Suspense fallback={<Loader></Loader>}><JobsWithFilter></JobsWithFilter></Suspense>,
    },
    {
        path: '/jobs-category/:title',
        element: <Suspense fallback={<Loader></Loader>}><CategoryJobsPage></CategoryJobsPage></Suspense>,
    },
      {
        path: '/search-result',
        element: <Suspense fallback={<Loader></Loader>}><SearchResult></SearchResult></Suspense>,
    },
      {
        path: '/browse-jobs',
        element: <Suspense fallback={<Loader></Loader>}><BrowseJobs></BrowseJobs></Suspense>,
    },
    {
        path: '/jobs-details/:id',
        element: <Suspense fallback={<Loader></Loader>}><JobsDetails></JobsDetails></Suspense>,
    },
    {
        path: '/profile/student',
        element: <Suspense fallback={<Loader></Loader>}><StudentProfile></StudentProfile></Suspense>,
    },
])

export const recruiterRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><CompaniesPage></CompaniesPage></Suspense>,
    },
     {
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
     {
        path: '/recruiter/add-job',
        element: <Suspense fallback={<Loader></Loader>}><AddJob></AddJob></Suspense>,
    },
     {
        path: '/recruiter/add-company',
        element: <Suspense fallback={<Loader></Loader>}><AddCompany></AddCompany></Suspense>,
    },
     {
        path: '/recruiter/companies',
        element: <Suspense fallback={<Loader></Loader>}><CompaniesPage></CompaniesPage></Suspense>,
    },
     {
        path: '/recruiter/jobs',
        element: <Suspense fallback={<Loader></Loader>}><JobsPage></JobsPage></Suspense>,
    },
     {
        path: '/recruiter/job/:id/applicants',
        element: <Suspense fallback={<Loader></Loader>}><Applicants></Applicants></Suspense>,
    },
])
