import Loadable from "../components/Loadable";
import {lazy} from "react";
import _404NotFound from "../pages/_404NotFound";

const HomePage = Loadable(lazy(() => import('../pages/home')));
const PlansPage = Loadable(lazy(() => import('../pages/plans')));
const LogInPage = Loadable(lazy(() => import('../pages/sessions/LogIn')));
const RegisterPage = Loadable(lazy(() => import('../pages/sessions/Register')));
const ProfilePage = Loadable(lazy(() => import('../pages/profile')));
const PasswordResetPage = Loadable(lazy(() => import('../pages/sessions/PasswordReset')));
const ForgetPasswordPage = Loadable(lazy(() => import('../pages/sessions/ForgetPassword/index')));

const CategoriesPage = Loadable(lazy(() => import('../pages/categories/index')));

const ImageGalleryPage = Loadable(lazy(() => import('../pages/images/gallery/index')));
const ShowImagePage = Loadable(lazy(() => import('../pages/images/show/index')));

const DownloadsPage = Loadable(lazy(() => import('../pages/downloads/index')));


const routes = [
    { path: '/', element: <HomePage />, exact: true },
    { path: '/plans', element: <PlansPage />, exact: true, },
    { path: '/login', element: <LogInPage />, exact: true, },
    { path: '/register', element: <RegisterPage />, exact: true, },
    { path: '/profile', element: <ProfilePage />, exact: true, authenticated: true },

    { path: '/reset-password/:id/:token', element: <PasswordResetPage />, exact: true },
    { path: '/forget-password', element: <ForgetPasswordPage />, exact: true },


    { path: '/categories/:id', element: <CategoriesPage />, exact: true },

    { path: '/images', element: <ImageGalleryPage />, exact: true },
    { path: '/images/:id', element: <ShowImagePage />, exact: true },


    { path: '/downloads', element: <DownloadsPage />, exact: true },


    { path: '*', element: <_404NotFound/>, exact: true }
];

export default routes;