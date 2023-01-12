import React from 'react';

const MasterCardVirtualCard = () => {
    return (
        <svg className="ub" width="32" height="24" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient x1="1.829%" y1="100%" x2="100%" y2="2.925%" id="c2a">
                    <stop stop-color="#6366F1" offset="0%"></stop>
                    <stop stop-color="#9FA1FF" offset="100%"></stop>
                    <stop stop-color="#9FA1FF" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
                <rect fill="url(#c2a)" width="32" height="24" rx="3"></rect>
                <ellipse fill="#E61C24" fill-rule="nonzero" cx="12.522" cy="12" rx="5.565" ry="5.647"></ellipse>
                <ellipse fill="#F99F1B" fill-rule="nonzero" cx="19.432" cy="12" rx="5.565" ry="5.647"></ellipse>
                <path d="M15.977 7.578A5.667 5.667 0 0 0 13.867 12c0 1.724.777 3.353 2.11 4.422A5.667 5.667 0 0 0 18.087 12a5.667 5.667 0 0 0-2.11-4.422Z" fill="#F26622" fill-rule="nonzero"></path>
            </g>
        </svg>
    );
};

export default MasterCardVirtualCard;