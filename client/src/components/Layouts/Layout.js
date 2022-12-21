import React, {useEffect} from 'react';
import { Suspense } from 'react';
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import userRole from "../../auth/roles";
import {useAction} from "../../hooks/useAction";
import {useSelector} from "react-redux";

const ClientLayout =  React.lazy(() => import('./ClientLayout'));

export const DarkBackground = styled.div`
  display: none; /* Hidden by default */
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



const LayoutSuspence = () => {

    const { profile } = useAction();
    const { user, isAuth, loading } = useSelector(store => store.user);


    useEffect(() => {
        profile();
    }, []);


    return (
        <Suspense>
            {
                !loading &&
                  <>
                      {
                          isAuth && user && user.role.name === userRole.Client
                            && <ClientLayout />
                      }
                      {
                          isAuth && user && user.role.name === userRole.Creator
                          && <ClientLayout />
                      }
                      {
                          !isAuth && <ClientLayout />
                      }
                  </>
            }
        </Suspense>
    );
};

export default LayoutSuspence;
