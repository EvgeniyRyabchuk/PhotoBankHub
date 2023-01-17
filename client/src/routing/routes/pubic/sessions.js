import Loadable from "../../../components/Loadable";
import {lazy} from "react";

const LogInPage = Loadable(lazy(() => import('../../../pages/sessions/LogIn')));
const RegisterPage = Loadable(lazy(() => import('../../../pages/sessions/Register')));

const PasswordResetPage = Loadable(lazy(() => import('../../../pages/sessions/PasswordReset')));
const ForgetPasswordPage = Loadable(lazy(() => import('../../../pages/sessions/ForgetPassword')));


const SessionRoutes = [
    { path: '/login', element: <LogInPage />, exact: true, },
    { path: '/register', element: <RegisterPage />, exact: true, },
    { path: '/reset-password/:id/:token', element: <PasswordResetPage />, exact: true },
    { path: '/forget-password', element: <ForgetPasswordPage />, exact: true },
];


export default SessionRoutes;