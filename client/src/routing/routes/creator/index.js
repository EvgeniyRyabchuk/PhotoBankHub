import Loadable from "../../../components/Loadable";
import userRole from "../../../auth/roles";
import {lazy} from "react";

const UploadsPage = Loadable(lazy(() => import('../../../pages/uploads')));
const CollectionsPage = Loadable(lazy(() => import('../../../pages/collections/all')));
const CollectionPage = Loadable(lazy(() => import('../../../pages/collections/show')));


const CreatorRoutes = [
    {
        path: '/uploads',
        element: <UploadsPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Creator]
    },
    {
        path: '/collections',
        element: <CollectionsPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Creator]
    },
    {
        path: '/collections/:id',
        element: <CollectionPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Creator]
    },
]

export default CreatorRoutes;