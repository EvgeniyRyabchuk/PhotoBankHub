import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import './index.scss';
import {useSelector} from "react-redux";
import {useAction} from "../../hooks/useAction";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";



const Header = () => {

    const { isAuth } = useSelector(store => store.user);
    const { logout } = useAction();
    const navigate = useNavigate();

    return (
        <header>
            <div className="nav-area">
                <Link to="/" className="logo">
                    Logo
                </Link>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;