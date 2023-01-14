import Loadable from "../../../components/Loadable";
import {lazy} from "react";
import userRole from "../../../auth/roles";

const DownloadsPage = Loadable(lazy(() => import('../../../pages/history/downloads')));
const LikesPage = Loadable(lazy(() => import('../../../pages/history/likes')));
const ViewsPage = Loadable(lazy(() => import('../../../pages/history/views')));


const ClientHistoryRoutes = [
    {
        path: '/downloads',
        element: <DownloadsPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
    {
        path: '/views',
        element: <ViewsPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
    {
        path: '/likes',
        element: <LikesPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
];

export default ClientHistoryRoutes;