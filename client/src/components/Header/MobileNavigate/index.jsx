import React, {useMemo, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {DrawerComponent, DrawerHeader, Wrapper} from "./styled";
import {navigations} from "../../../routing/navigations";
import MenuItems from "../MenuItems";
import {NavigateList} from "../styled";
import {InsertPhoto, Landscape, Logout, Sell} from "@mui/icons-material";
import {Button, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import {getAvatar} from "../../../utills/axios";
import {useSelector} from "react-redux";
import userRole from "../../../auth/roles";
import {useAction} from "../../../hooks/useAction";
import {userRoutes} from "../data";


const MobileNavigate = ({ categories }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { user, isAuth } = useSelector(state => state.user);
    const { logout } = useAction();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigateClickHandler = (menu) => {
        navigate(menu.url);
        setOpen(false);
    }

    const personalUserRoutes = useMemo(() => {
        return userRoutes.filter(route => {
            if(!route.authenticated && !isAuth)
                return true;
            if(!route.role && route.authenticated === true && isAuth === true)
                return true;
            if(route.role && isAuth === true && route.role === user.role.name)
                return true;
            return false;
        });
    }, [user, isAuth]);

    return (
        <Wrapper>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
            >
                <MenuIcon sx={{ fontSize: '30px'}}/>
            </IconButton>

            <DrawerComponent
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    { isAuth &&
                        <Button title="Account settings" onClick={() =>
                            navigateClickHandler({ url: '/profile'})
                        }>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar src={getAvatar(user)} sx={{ width: 32, height: 32 }}></Avatar>
                                Profile
                            </IconButton>
                        </Button>
                    }
                </DrawerHeader>

                <Divider />

                {/* Categories */}
                <Typography variant='h6' sx={{ mt: 3}}>
                    Categories
                </Typography>
                <List>
                    { categories.map((category, index) =>
                            <ListItem key={category.id} disablePadding>
                                <ListItemButton onClick={() => navigateClickHandler(category)}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InsertPhoto /> : <Landscape />}
                                    </ListItemIcon>
                                    <ListItemText primary={category.title} />
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                </List>
                <Divider />

                {/* Navigation */}
                <Typography variant='h6' sx={{ mt: 3}}>
                    Navigation
                </Typography>
                <List>
                    <>
                        {navigations.map((menu, index) =>
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => navigateClickHandler(menu)}>
                                    <ListItemIcon>
                                        {menu.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menu.title} />
                                </ListItemButton>
                            </ListItem>
                        )}
                        <ListItem disablePadding onClick={() => setOpen(false)}>
                            <ListItemButton onClick={() => navigateClickHandler({ url: '/plans'})}>
                                <ListItemIcon>
                                    <Sell />
                                </ListItemIcon>
                                <ListItemText primary='Plans' />
                            </ListItemButton>
                        </ListItem>
                    </>
                </List>
                <Divider />

                {/* Sessions/User Routes */}
                <Typography variant='h6' sx={{ mt: 3}}>
                    Sessions/User Routes
                </Typography>
                <List>
                    {personalUserRoutes.map(route =>
                        <ListItem key={route.url} disablePadding onClick={() => setOpen(false)}>
                            <ListItemButton onClick={() => navigateClickHandler({ url: route.url})}>
                                <ListItemIcon>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText primary={route.title} />
                            </ListItemButton>
                        </ListItem>
                    )}
                    { isAuth &&
                        <ListItem disablePadding onClick={() => setOpen(false)}>
                            <ListItemButton onClick={() => {
                                logout();
                                navigate('/');
                            }}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItemButton>
                        </ListItem>
                    }

                </List>
                <Divider />

            </DrawerComponent>
        </Wrapper>
    );
}



export default MobileNavigate;