import React from 'react';
import Header from "../Headers";
import {Outlet} from "react-router-dom";
import Footer from "../Footer";
import tw from "twin.macro";

const Main = tw.div`min-h-screen`

const ClientLayout = () => {


    return (
        <div>
            <Header/>

            <Main>
                <Outlet />
            </Main>

            <Footer />
        </div>
    );
};

export default ClientLayout;