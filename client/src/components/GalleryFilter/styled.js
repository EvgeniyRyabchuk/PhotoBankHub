import {Box, Button, Grid, styled} from "@mui/material";


const FilterWrapper = styled(Box)(({ isOpen }) => ({
    height: isOpen ? '400px' : '0',
    border: isOpen ? '2px dashed gray' : 'inherit',
    transition: '0.3s height',
    overflow: "hidden",
    overflowY: 'scroll',
    margin:  isOpen ? '10px' : '0'
}));

const FilterTop = styled(Box)(() => ({
    top: '10px',
    left: '10px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    padding: '0 10px'
}));

const FilterContentGrid = styled(Grid)(() => ({
    padding: '15px',
    margin: '0',
    width: '100%'
}));


const ResetBtn = styled(Button)(() => ({
    backgroundColor: 'gray',
    color: 'white',
    marginLeft: '10px',
    height: '40px'
}));

export {
    FilterWrapper,
    FilterTop,
    FilterContentGrid,
    ResetBtn
}