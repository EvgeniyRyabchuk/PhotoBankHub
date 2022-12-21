import React, {Suspense} from 'react';
import {CircularProgress} from "@mui/material";

const PageLoader = (
    <div style={{ position: "relative", top: '100px'}}>
        <CircularProgress />
    </div>
)

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