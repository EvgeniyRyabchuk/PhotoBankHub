import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import './index.scss';
import {useSelector} from "react-redux";
import {useAction} from "../../hooks/useAction";

const Header = () => {

    const { isAuth } = useSelector(store => store.user);
    const { logout } = useAction();
    const navigate = useNavigate();


    return (
        <div className='header'>
            Header

            <ul>
                <li>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/plans'>
                        Plans
                    </NavLink>
                </li>

                { !isAuth &&
                    <>
                        <li>
                            <NavLink to='/login'>
                                LogIn
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/register'>
                                Register
                            </NavLink>
                        </li>
                    </>
                }

                { isAuth &&
                    <>
                        <li>
                            <NavLink to='/profile'>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/login");
                                    logout();
                                 }}
                            >
                                Logout
                            </NavLink>
                        </li>
                    </>
                }

            </ul>
        </div>
    );
};

export default Header;