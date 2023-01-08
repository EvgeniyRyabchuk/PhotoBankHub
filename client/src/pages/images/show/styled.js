import {Box, Button, styled} from "@mui/material";
import {JustifyContent} from "../../../assets/shared/styles";
import {blue, cyan, purple, red} from "@mui/material/colors";
import {mainColorHex, mainPrimaryColorHex, mainSecondaryColorHex} from "../../../utills/const";


const ImageContainerWrapper = styled(Box)(({theme}) => ({
    margin: '20px auto',
    display: 'flex',
    width: '1280px',

    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },

}));

const ImageWrapper = styled(JustifyContent)(({theme}) => ({
    margin: '15px 0',
    minHeight: '50px',
    cursor: 'pointer',
}));

const ImageName = styled(Box)(({theme, text}) => ({
    margin: '10px 0',
    textAlign: text.length > 66 ? 'justify' : "center",
    fontSize: '20px',
    wordBreak: 'break-word'
}));

const ImageVariant = styled(Box)(({theme, text}) => ({
    width: '100%',
    cursor: 'pointer',
    "&: hover" : {
        backgroundColor: 'lightgray'
    }
}));

const DownloadButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: mainPrimaryColorHex,
    '&:hover': {
        backgroundColor: mainSecondaryColorHex,
    },
}));

const DownloadPreview = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: cyan[400],
    '&:hover': {
        backgroundColor: cyan[800],
    },
}));

export {
    ImageContainerWrapper,
    ImageWrapper,
    ImageName,
    ImageVariant,
    DownloadButton,
    DownloadPreview
}
