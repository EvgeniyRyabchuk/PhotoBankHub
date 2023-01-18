import Loadable from "../../components/Loadable";
import {lazy} from "react";
import _404NotFound from "../../pages/statuses/http/_404NotFound";
import PublicRoutes from "./pubic";
import ClientRoutes from "./client";
import CreatorRoutes from "./creator";
import ComingSoon from "../../pages/statuses/http/ComingSoon";


const ProfilePage = Loadable(lazy(() => import('../../pages/profile')));
const CreatorAllPage = Loadable(lazy(() => import('../../pages/creator/all')));
const CreatorShowPage = Loadable(lazy(() => import('../../pages/creator/show')));

const routes = [
    { path: '/profile', element: <ProfilePage />, exact: true, authenticated: true },
    { path: '/creators', element: <CreatorAllPage />, exact: true },
    { path: '/creators/:id', element: <CreatorShowPage />, exact: true },

    // example of temp page placeholder (for those who is coming soon or in development )
    { path: '/creators/:id/collections', element: <ComingSoon />, exact: true },

    ...PublicRoutes,
    ...ClientRoutes,
    ...CreatorRoutes,

    { path: '*', element: <_404NotFound/>, exact: true }
];

export default routes;