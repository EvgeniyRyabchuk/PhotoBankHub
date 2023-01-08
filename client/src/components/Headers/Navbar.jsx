import {navigations} from '../../routing/navigations';
import MenuItems from './MenuItems';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useEffect, useMemo, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import {useSelector} from "react-redux";
import {getAvatar} from "../../utills/axios";
import {AttachMoney, Download, Favorite, ThumbUp, Visibility} from "@mui/icons-material";
import {useAction} from "../../hooks/useAction";
import {JustifyBox} from "../../assets/shared/styles";


const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { logout } = useAction();

    const { user, isAuth } = useSelector(state => state.user);

    const { fetchCategories } = useAction();
    const { categories } = useSelector(state => state.general);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const formatting = (category, categories) => {
        const children = categories.filter(c => c.parent_id === category.id);

        const result = {
            id: category.id,
            title: category.name,
            url: `/categories/${category.id}`,
        }

        if(children && children.length > 0) {
            const formattedChildren = [];
            for (let c of children)
                formattedChildren.push(formatting(c, categories));

            result.submenu = formattedChildren;
        } else {
            result.url = `/images?categoriesIds=${result.id}`
        }

        return result;
    }


    const formattedCategories = useMemo(() => {
        if(categories.length === 0) return [];

        const parrentless = categories.filter(c => c.parent_id === null);

        const result = [];
        for(let category of parrentless) {
            result.push(formatting(category, categories));
        }
        return result;
    }, [categories]);



  return (
    <nav>
      <ul className="menus">
        {navigations.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MenuItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
            />
          );
        })}
          {
              formattedCategories.map((category) => {
                  const depthLevel = 0;
                  return (
                      <MenuItems
                          items={category}
                          key={category.id}
                          depthLevel={depthLevel}
                      />
                  );
            })
          }

      </ul>

        <JustifyBox>
            <Box>
                {/*<Typography sx={{ minWidth: 100 }}>Contact</Typography>*/}
                <NavLink style={{ display: 'inline-block' }} to='/plans'>
                    <Typography sx={{ minWidth: 100 }}>Plans</Typography>
                </NavLink>

                <NavLink style={{ display: 'inline-block' }} to='/login'>
                    <Typography sx={{ minWidth: 100 }}>Login</Typography>
                </NavLink>

                <NavLink style={{ display: 'inline-block' }} to='/register'>
                    <Typography sx={{ minWidth: 100 }}>Register</Typography>
                </NavLink>


                {
                    isAuth &&
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar src={getAvatar(user)} sx={{ width: 32, height: 32 }}></Avatar>
                        </IconButton>
                    </Tooltip>
                }

            </Box>

            {
                isAuth &&
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => navigate(`/profile`)}>
                        <Avatar src={getAvatar(user)} /> Profile
                    </MenuItem>
                    <MenuItem>
                        <AttachMoney sx={{ mr: 1}}/> Bills & Payment
                    </MenuItem>
                    <MenuItem>
                        <Favorite sx={{ mr: 1}}/> Favorites
                    </MenuItem>
                    <MenuItem>
                        <ThumbUp sx={{ mr: 1}}/> Likes
                    </MenuItem>
                    <MenuItem>
                        <Visibility sx={{ mr: 1}}/> Views
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/downloads')}>
                        <Download sx={{ mr: 1}}/> Downloads
                    </MenuItem>

                    <Divider />

                    <Box>
                        <p>
                            Left image: 10
                        </p>
                        <p>
                            Your plan: standard
                        </p>
                    </Box>

                    <Divider />

                    <MenuItem>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={() => {
                        logout();
                        navigate("/login");
                    }}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            }


        </JustifyBox>
    </nav>
  );
};

export default Navbar;
