import React from 'react';
import {useNavigate} from "react-router-dom";
import './index.scss';
import {useSelector} from "react-redux";
import {useAction} from "../../hooks/useAction";
import Navbar from "./Navbar";
import LogoImg from '../../assets/images/custom/small_logo_main.png';
import {LogoContainerLink} from "./styled";


const Header = () => {
    const { isAuth } = useSelector(store => store.user);
    const { logout } = useAction();
    const navigate = useNavigate();

    return (
        <header>

            <div className="nav-area">
                <LogoContainerLink to='/'>
                    <img src={LogoImg} />
                    <span>PhotoBank<span style={{ color: 'red'}}>Hub</span></span>
                </LogoContainerLink>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;