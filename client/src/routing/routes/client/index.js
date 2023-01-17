import ClientHistoryRoutes from "./history";
import Loadable from "../../../components/Loadable";
import userRole from "../../../auth/roles";
import {lazy} from "react";


const CheckoutPage = Loadable(lazy(() => import('../../../pages/checkout')));
const FavoritesPage = Loadable(lazy(() => import('../../../pages/favorites/all')));
const FavoritePage = Loadable(lazy(() => import('../../../pages/favorites/show')));
const BillsPage = Loadable(lazy(() => import('../../../pages/bills/index')));


const ClientRoutes = [
    ...ClientHistoryRoutes,
    {
        path: '/favorites',
        element: <FavoritesPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
    {
        path: '/favorites/:id',
        element: <FavoritePage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
    {
        path: '/bills',
        element: <BillsPage />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client]
    },
]

export default ClientRoutes;