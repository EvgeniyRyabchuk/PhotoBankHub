import {Box, styled} from "@mui/material";


const FilterWrapper = styled(Box)(({ isOpen }) => ({
    height: isOpen ? '300px' : '0',
    border: isOpen ? '2px dashed gray' : 'inherit',
    transition: '0.3s height',
    overflow: "hidden",
    overflowY: 'scroll',
    margin:  isOpen ? '10px' : '0'
}));

const FilterContent = styled(Box)(() => ({
    top: '10px',
    left: '10px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    padding: '0 10px'
}));

export {
    FilterWrapper,
    FilterContent
}