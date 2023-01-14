import {Box, styled} from "@mui/material";

const FavoriteCardWrapper = styled(Box)(({ theme }) => ({
    // maxWidth: 250,
    // flexGrow: 1,
    padding: '10px',
    width: '20%',
    height: '300px',
    [theme.breakpoints.down('xl')] : {
        width: '25%'
    },
    [theme.breakpoints.down('lg')] : {
        width: '33%'
    },
    [theme.breakpoints.down('md')] : {
        width: '50%'
    },
    [theme.breakpoints.down('sm')] : {
        width: '100%'
    },
    "& :hover": {
        backgroundColor: '#D5dede'
    }
}));

const FavoriteCardImage = styled(Box)(({ theme, src }) => ({
    backgroundImage: `url(${src})`,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'block',
    // background: 'rgba(0,0,0,0) center no-repeat',
    backgroundSize: 'cover',
    borderRadius: '5px 5px 0 0',
}));

export {
    FavoriteCardWrapper,
    FavoriteCardImage,
}