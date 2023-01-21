import {Box, Button, Grid, styled} from "@mui/material";
import {JustifyContent} from "../../../assets/shared/styles";
import {cyan, purple} from "@mui/material/colors";
import {mainPrimaryColorHex, mainSecondaryColorHex} from "../../../utills/const";


const ImageContainerWrapper = styled(Box)(({theme}) => ({
    margin: '20px auto',
    marginBottom: '60px',
    display: 'flex',
    width: '1280px',

    [theme.breakpoints.down('lg')]: {
        width: '100%',
    },

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

const GridItemImageWrapperLeft = styled(Grid)(({ theme }) => ({
    padding: '0 16px',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));


export {
    ImageContainerWrapper,
    ImageName,
    ImageVariant,
    DownloadButton,
    DownloadPreview,
    GridItemImageWrapperLeft
}
