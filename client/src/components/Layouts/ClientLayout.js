import React from 'react';
import Header from "../Headers";
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "../Footer";


const ClientLayout = () => {
    return (
        <div>
            <Header/>

            <Outlet />

            <Footer />
        </div>
    );
};

export default ClientLayout;