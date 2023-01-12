import React, {useEffect} from 'react';
import Header from "../Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer";
import tw from "twin.macro";
import {useAction} from "../../hooks/useAction";
import {CardActionTypes} from "../../store/reducers/cardReducer";
import {useDispatch} from "react-redux";

const Main = tw.div`min-h-screen`

const ClientLayout = () => {

    const { fetchCategories } = useAction();

    useEffect(() => {
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