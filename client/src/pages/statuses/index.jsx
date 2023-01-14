import React from 'react';
import './style.scss';

const StatusWrapper = ({ children }) => {
    return (
        <div id='__next'>
            <div className='layout-wrapper MuiBox-root css-33gw4'>
                <div className="app-content MuiBox-root css-10qwnza">
                    <div className="content-center MuiBox-root css-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusWrapper;