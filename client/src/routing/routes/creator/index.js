import Loadable from "../../../components/Loadable";
import userRole from "../../../auth/roles";
import {lazy} from "react";

const Uploads = Loadable(lazy(() => import('../../../pages/uploads')));


const CreatorRoutes = [
    {
        path: '/uploads',
        element: <Uploads />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Creator]
    },
]

export default CreatorRoutes;