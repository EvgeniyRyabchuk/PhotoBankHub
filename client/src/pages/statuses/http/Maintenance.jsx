import React from 'react';
import StatusWrapper from "../index";
import MaintenanceImage from '../../../assets/images/misc-under-maintenance.png'
import {useNavigate} from "react-router-dom";

const Maintenance = () => {
    const navigate = useNavigate();


    return (
        <StatusWrapper>
            <div className="MuiBox-root css-1w5hm2q">
                <div className="MuiBox-root css-19vd9r8">
                    <h4
                    className="MuiTypography-root MuiTypography-h4 css-1svogxx">
                        Under Maintenance!
                    </h4>
                    <p
                        className="MuiTypography-root MuiTypography-body1 css-jkwncm">
                        Sorry for the inconvenience but we're
                        performing some maintenance at the moment
                </p>
                    <a className="MuiButtonBase-root MuiButton-root MuiButton-contained
                        MuiButton-containedPrimary MuiButton-sizeMedium
                        MuiButton-containedSizeMedium MuiButton-root MuiButton-contained
                        MuiButton-containedPrimary MuiButton-sizeMedium
                        MuiButton-containedSizeMedium css-1qt4f5u"
                    tabIndex="0"
                       onClick={() => navigate(-1)}>
                    Back to Home
                    <span className="MuiTouchRipple-root css-w0pj6f"></span>
                </a>
                </div>
                <img height="500" alt="under-maintenance-illustration"
                     src={MaintenanceImage}
                     className="css-10xetz8" />
                </div>
        </StatusWrapper>
    );
};

export default Maintenance;