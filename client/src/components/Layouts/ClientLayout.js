import React, {useEffect} from 'react';
import Header from "../Headers";
import {Outlet} from "react-router-dom";
import Footer from "../Footer";
import tw from "twin.macro";
import {useAction} from "../../hooks/useAction";

const Main = tw.div`min-h-screen`

const ClientLayout = () => {

    const { fetchCategories } = useAction();

    useEffect(() => {
        console.log(123)
        fetchCategories();
    }, [])


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