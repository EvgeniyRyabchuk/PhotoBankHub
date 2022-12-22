import {Route, Routes} from "react-router-dom";
import userRole from "../auth/roles";
import LayoutSuspense from "../components/Layouts/Layout";
import AuthGuard from "../auth/AuthGuard";
import routes from "./routes";

/*

Template

    path: '/',
    element: <HeaderPage />,
    children: [
        {
            path: '/a',
        }
    ],
    exact: true,
    authenticated: false,
    accessRoles: [

    ]

 */



const Routing = () => {

    const routesWithAuthGuard = routes.map((route) =>  {
            if(route.authenticated)
                route.element = (<AuthGuard accessRoles={route.accessRoles}>
                    {route.element}
                </AuthGuard>)
            return route;
        }
    )

    return (
        <>
            <Routes>
                <Route
                    element={<LayoutSuspense />}
                    children={[
                        routesWithAuthGuard.map(route =>
                            <Route
                                path={route.path}
                                element={route.element}
                                exact={route.exact}
                            />
                        )
                    ]}
                />
            </Routes>
        </>
    )
}

export default Routing
