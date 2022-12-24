import {styled} from "@mui/material";
import {Link} from "react-router-dom";

const LogoContainerLink = styled(Link)(({ theme }) => ({
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',

    "& span": {
        fontSize: '22px',
        textAlign: 'center',
        padding: '10px 0',
        margin: '0 2px',
    },
    "& img": {
        width: '42px',
        height: '42px',
        margin: '0 2px',
    },
}));

export {
    LogoContainerLink
}