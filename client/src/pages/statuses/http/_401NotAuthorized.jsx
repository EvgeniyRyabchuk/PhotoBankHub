import React from 'react';
import StatusWrapper from "../index";
import _401Image from '../../../assets/images/401.png';
import MaskImage from '../../../assets/images/misc-mask-light.png';
import {NavLink, useNavigate} from "react-router-dom";

const _401NotAuthorized = () => {
    const navigate = useNavigate();

    return (
        <StatusWrapper>
            <div className="MuiBox-root css-1w5hm2q">
                <div className="MuiBox-root css-19vd9r8"><h4
                    className="MuiTypography-root MuiTypography-h4 css-1svogxx">
                    You are not authorized!
                </h4>
                    <p className="MuiTypography-root MuiTypography-body1 css-1toajlr">
                        You do not have permission to
                        view this page using the credentials that you have provided while login.
                    </p>
                    <p className="MuiTypography-root MuiTypography-body1 css-jkwncm">
                        Please contact your site
                        administrator.
                    </p>
                    <NavLink to='/'
                             className="MuiButtonBase-root MuiButton-root MuiButton-contained
                                MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium
                                MuiButton-root MuiButton-contained MuiButton-containedPrimary
                                MuiButton-sizeMedium MuiButton-containedSizeMedium css-1qt4f5u"
                         tabIndex="0"
                    >
                        Back to Home
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                    </NavLink>
                    <NavLink to='/login'
                             className="MuiButtonBase-root MuiButton-root MuiButton-contained
                                MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium
                                MuiButton-root MuiButton-contained MuiButton-containedPrimary
                                MuiButton-sizeMedium MuiButton-containedSizeMedium css-1qt4f5u"
                             tabIndex="0"
                    >
                        Log In
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                    </NavLink>
                </div>
                <img height="500" alt="error-illustration" src={_401Image} className="css-cud2wc"/>
            </div>
            <img alt="mask" src={MaskImage} className="css-oijvh6"/>
        </StatusWrapper>

    );
};

export default _401NotAuthorized;