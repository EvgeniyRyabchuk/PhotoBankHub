import React from 'react';
import StatusWrapper from "../index";
import _505ServerErrorImage from '../../../assets/images/500.png';
import {NavLink, useNavigate} from "react-router-dom";

const _500ServerError = () => {

    const navigate = useNavigate();


    return (
        <StatusWrapper>
            <div className="MuiBox-root css-1w5hm2q">
                <div className="MuiBox-root css-19vd9r8">
                    <h4 className="MuiTypography-root MuiTypography-h4 css-1svogxx">
                        Oops, something went wrong!
                    </h4>
                    <p className="MuiTypography-root MuiTypography-body1 css-jkwncm">
                        There was an error with the internal
                        server. Please contact your site administrator.
                    </p>
                    <NavLink className="MuiButtonBase-root MuiButton-root
                        MuiButton-contained MuiButton-containedPrimary
                        MuiButton-sizeMedium MuiButton-containedSizeMedium
                        MuiButton-root MuiButton-contained MuiButton-containedPrimary
                        MuiButton-sizeMedium MuiButton-containedSizeMedium css-1qt4f5u"
                        tabIndex="0"
                        onClick={() => navigate(-1) }
                    >
                        Back to Prev Page
                    <span className="MuiTouchRipple-root css-w0pj6f"></span>
                </NavLink>
                </div>
                <img height="500"
                     alt="error-illustration"
                     src={_505ServerErrorImage}
                     className="css-cud2wc"
                />
                </div>
        </StatusWrapper>
    );
};

export default _500ServerError;