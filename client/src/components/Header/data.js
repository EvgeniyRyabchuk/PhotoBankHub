import userRole from "../../auth/roles";
import {AttachMoney, CollectionsBookmark, Download, Favorite, Settings, ThumbUp, Visibility} from "@mui/icons-material";

export const userRoutes = [
    {
        title: 'Login',
        url: '/login',
        icon: '',
        authenticated: false,
    },
    {
        title: 'Register',
        url: '/register',
        icon: '',
        authenticated: false,
    },
    {
        title: 'Billing & Payment',
        url: '/bills',
        icon: <AttachMoney />,
        authenticated: true,
        role: userRole.Client
    },
    {
        title: 'Favorites',
        url: '/favorites',
        icon: <Favorite />,
        authenticated: true,
        role: userRole.Client
    },
    {
        title: 'Likes',
        url: '/likes',
        icon: <ThumbUp />,
        authenticated: true,
        role: userRole.Client
    },
    {
        title: 'Views',
        url: '/views',
        icon: <Visibility />,
        authenticated: true,
        role: userRole.Client
    },
    {
        title: 'Downloads',
        url: '/downloads',
        icon: <Download />,
        authenticated: true,
        role: userRole.Client
    },
    {
        title: 'Collections',
        url: '/collections',
        icon: <CollectionsBookmark />,
        authenticated: true,
        role: userRole.Creator
    },
    {
        title: 'Upload',
        url: '/upload',
        icon: <Download />,
        authenticated: true,
        role: userRole.Creator
    },
    {
        title: 'Setting',
        url: '/profile?tab=5',
        icon: <Settings />,
        authenticated: true,
    },
]
