import React from 'react';
import StatusWrapper from "../index";
import _401Image from '../../../assets/images/401.png';
import MaskImage from '../../../assets/images/misc-mask-light.png';
import {NavLink, useNavigate} from "react-router-dom";

const _403Forbidden = () => {
    const navigate = useNavigate();

    return (
        <StatusWrapper>
            <div className="MuiBox-root css-1w5hm2q">
                <div className="MuiBox-root css-19vd9r8"><h4
                    className="MuiTypography-root MuiTypography-h4 css-1svogxx">
                    You don't have permission for this
                </h4>
                    <p className="MuiTypography-root MuiTypography-body1 css-1toajlr">
                        Your client doesn’t have permission to access this
                        resource or to perform the operation. Usually this
                        means the user your client is logged in as just doesn’t own
                        the resource or doesn’t have the access rights needed.
                    </p>
                    <NavLink to='/'
                             className="MuiButtonBase-root MuiButton-root MuiButton-contained
                                MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium
                                MuiButton-root MuiButton-contained MuiButton-containedPrimary
                                MuiButton-sizeMedium MuiButton-containedSizeMedium css-1qt4f5u"
                             tabIndex="0"
                    >
                        Back to Home
                        <span className="MuiTouchRipple-root css-w0pj6f">
                        </span>
                    </NavLink>
                </div>
                <img height="500" alt="error-illustration" src={_401Image} className="css-cud2wc"/>
            </div>
            <img alt="mask" src={MaskImage} className="css-oijvh6"/>
        </StatusWrapper>

    );
};

export default _403Forbidden;