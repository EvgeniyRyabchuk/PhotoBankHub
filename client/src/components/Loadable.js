import React, {Suspense} from 'react';
import {CircularProgress} from "@mui/material";

export const PageLoader = (
    <div style={{ position: "relative", top: '100px'}}>
        <CircularProgress />
    </div>
)

export const PageLoaderElement = () => {
    return (
        <div style={{
            position: "fixed",
            top: '50%',
            left: '50%',
            zIndex: '999'
        }}>
            <CircularProgress />
        </div>
    )
}

const Loadable = (Component) => (props) => {
    return (
        <div>
            <Suspense fallback={PageLoader}>
                <Component {...props} />
            </Suspense>
        </div>
    );
};

export default Loadable;