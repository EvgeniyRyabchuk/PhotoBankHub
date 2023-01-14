import Loadable from "../../components/Loadable";
import {lazy} from "react";
import _404NotFound from "../../pages/statuses/http/_404NotFound";
import {PublicRoutes} from "./pubic";
import {ClientRoutes} from "./client";


const ProfilePage = Loadable(lazy(() => import('../../pages/profile')));

const routes = [
    { path: '/profile', element: <ProfilePage />, exact: true, authenticated: true },
    ...PublicRoutes,
    ...ClientRoutes,

    { path: '*', element: <_404NotFound/>, exact: true }
];

export default routes;