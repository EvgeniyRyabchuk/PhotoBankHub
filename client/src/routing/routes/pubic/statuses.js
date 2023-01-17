import _401NotAuthorized from "../../../pages/statuses/http/_401NotAuthorized";
import _500ServerError from "../../../pages/statuses/http/_500ServerError";
import Maintenance from "../../../pages/statuses/http/Maintenance";
import ComingSoon from "../../../pages/statuses/http/ComingSoon";
import _403Forbidden from "../../../pages/statuses/http/_403Forbidden";
import PaymentSuccess from "../../../pages/statuses/payment/PaymentSuccess";
import PaymentFail from "../../../pages/statuses/payment/PaymentFail";
import userRole from "../../../auth/roles";

const httpStatusesRoutes = [
    { path: '/statuses/not_authorized', element: <_401NotAuthorized />, exact: true },
    { path: '/statuses/server_error', element: <_500ServerError />, exact: true },
    { path: '/statuses/maintenance', element: <Maintenance />, exact: true },
    { path: '/statuses/coming_soon', element: <ComingSoon />, exact: true },
    { path: '/statuses/forbidden', element: <_403Forbidden />, exact: true },
]

const paymentStatusesRoutes = [
    {
        path: '/statuses/payment/success',
        element: <PaymentSuccess />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client],
    },
    {
        path: '/statuses/payment/fail',
        element: <PaymentFail />,
        exact: true,
        authenticated: true,
        accessRoles: [userRole.Client],
    },
]

export default [
    ...httpStatusesRoutes,
    ...paymentStatusesRoutes
];