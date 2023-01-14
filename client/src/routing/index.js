import {Route, Routes} from "react-router-dom";
import LayoutSuspense from "../components/Layouts/Layout";
import AuthGuard from "../auth/AuthGuard";
import routes from "./routes/index";
import {useMemo} from "react";


const Routing = () => {

    const routesWithAuthGuard = useMemo(() => {
        return routes.map((route) =>  {
            if(route.authenticated)
                route.element = (
                    <AuthGuard accessRoles={route.accessRoles}>
                        {route.element}
                    </AuthGuard>
                )
            return route;
        });
    }, []);

    return (
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
    )
}

export default Routing
