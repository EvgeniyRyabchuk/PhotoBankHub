import {Grid, styled} from "@mui/material";

const CreativeGridContainer = styled(Grid)(({ theme }) => ({
    width: '1200px',
    margin: '0 auto',

    [theme.breakpoints.down('lg') ]: {
        width: '800px',
    },
    [theme.breakpoints.down('md') ]: {
        width: '100%',
    }
}));

const RightGridContainer = styled(Grid)(({ theme }) => ({
    padding: '1rem !important',
    height: '100%',
    [theme.breakpoints.down('md') ]: {
        "& > .css-mgnt6c-MuiGrid-root>.MuiGrid-item ": {
            padding: '5px !important',
        }
    }
}));

const RightGridContent = styled(Grid)(({ theme }) => ({
    width: '100%',
    maxHeight: '680px',
    overflowY: 'auto',
    margin: '20px 0px',
    flexGrow: 1,

    [theme.breakpoints.down('md') ]: {
        maxHeight: '100%',
    }
}));



const LeftGridContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem !important'
}));



export {
    CreativeGridContainer,
    RightGridContainer,
    RightGridContent,
    LeftGridContainer,

}