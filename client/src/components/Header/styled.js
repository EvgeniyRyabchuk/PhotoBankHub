import {styled} from "@mui/material";
import {Link} from "react-router-dom";
import {JustifyBox} from "../../assets/shared/styles";

const LogoContainerLink = styled(Link)(({ theme }) => ({
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
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


    [theme.breakpoints.down('sm')] : {
        "& .logo-text": {
            display: 'block',
            fontSize: '16px'
        },
        width: '100%',
        // position: 'absolute',
        // left: '10px'
    },

}));

const PaperProps = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

const NavigateList = styled('ul')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',

    [theme.breakpoints.down('md')] : {
        display: 'none',
    }
}));

const RightMenu = styled(JustifyBox)(({ theme }) => ({
    [theme.breakpoints.down('md')] : {
        width: '100%',
        justifyContent: 'right',
    },
    [theme.breakpoints.down('sm')] : {
        "& .right-menu-first-box": {
            display: 'none'
        }

    }
}));


export {
    LogoContainerLink,
    PaperProps,
    NavigateList,
    RightMenu
}