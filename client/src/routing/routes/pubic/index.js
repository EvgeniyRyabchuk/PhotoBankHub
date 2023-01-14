import Loadable from "../../../components/Loadable";
import {lazy} from "react";
import {SessionRoutes} from "./sessions";
import StatusesRoutes from "./statuses";


const HomePage = Loadable(lazy(() => import('../../../pages/home')));
const PlansPage = Loadable(lazy(() => import('../../../pages/plans')));
const CategoriesPage = Loadable(lazy(() => import('../../../pages/categories')));
const ImageGalleryPage = Loadable(lazy(() => import('../../../pages/images/gallery')));
const ShowImagePage = Loadable(lazy(() => import('../../../pages/images/show')));



export const PublicRoutes = [
    { path: '/', element: <HomePage />, exact: true },
    { path: '/plans', element: <PlansPage />, exact: true, },
    { path: '/categories/:id', element: <CategoriesPage />, exact: true },
    { path: '/images', element: <ImageGalleryPage />, exact: true },
    { path: '/images/:id', element: <ShowImagePage />, exact: true },
    ...SessionRoutes,
    ...StatusesRoutes,
]