import {styled} from "@mui/system";
import {Box} from "@mui/material";


export const CropWrapper = styled(Box)(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
}));

export const CropContent = styled(Box)(() => ({
    width: '500px',
    height: '500px',
    position: 'relative'
}));

