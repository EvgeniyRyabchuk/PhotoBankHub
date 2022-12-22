import React, {Fragment, useEffect, useMemo, useState} from 'react';
import { Suspense } from 'react';
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import userRole from "../../auth/roles";
import {useAction} from "../../hooks/useAction";
import {useSelector} from "react-redux";
import MaterialLoader from "../MaterialLoader";

const ClientLayout =  React.lazy(() => import('./ClientLayout'));

export const DarkBackground = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */ 
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */ 
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
  justify-content: center;
  align-items: center;
  
  ${(props) =>
    props.disappear &&
    css`
      display: flex; /* show */
    `}
  
`;


const LayoutSuspense = () => {

    const { user, isAuth, loading } = useSelector(store => store.user);

    const [layout, setLayout] = useState(null);

    const selectLayout = () => {
        if(isAuth && user
            && user.role.name === userRole.Client)
            setLayout(<ClientLayout />);

        else if(isAuth && user
            && user.role.name === userRole.Creator)
            setLayout(<ClientLayout />);

        else if(!isAuth)
            setLayout(<ClientLayout />);
    }

    useEffect(() => {
        selectLayout();
    }, [])

    const suspenseLayout = useMemo(() => {
        if (layout === null) return (<Fragment>123</Fragment>);
        return (
            <Suspense fallback={
                <DarkBackground>
                    <MaterialLoader/>
                </DarkBackground>
            }>
                {layout}
            </Suspense>
        )

    }, [layout]);

    return (
        <>
            {suspenseLayout}
        </>
    );
};

export default LayoutSuspense;
