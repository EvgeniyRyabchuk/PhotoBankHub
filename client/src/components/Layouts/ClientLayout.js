import React from 'react';
import Header from "../Header";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Footer from "../Footer";


const ClientLayout = () => {
    return (
        <div>
            Client Layout

            <div style={{ padding: '50px'}}>

                <Header/>

                <Outlet />

                <Footer />
            </div>

        </div>
    );
};

export default ClientLayout;