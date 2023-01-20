import {Box, Button, styled} from "@mui/material";

const FlexBox = ({ children, ...props }) => (
    <Box display="flex" {...props}>
        {children}
    </Box>
);


const JustifyContent = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

const AlignItem = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))


const JustifyStart = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
}))

const JustifySpaceBetween = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))


const JustifyBox = styled(JustifyContent)(() => ({
    alignItems: 'center'
}))


const JustifyWrap = styled(JustifyContent)(() => ({
    flexWrap: 'wrap'
}))


const ErrorSpan  = styled('p')(() => ({
    color: 'red',
}));




// styled components
const IconWrapper = styled(Box)(({ theme, color }) => ({
    width: 40,
    height: 40,
    color: "white",
    display: "flex",
    borderRadius: "4px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color ? color : theme.palette.primary.main,
}));

const FollowWrapper = styled(Box)(( {theme, fullWidth} ) => ({
    maxWidth: '100%',
    margin: "auto",
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 30,
    paddingRight: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: 'wrap',

    [theme.breakpoints.down('sm')] : {
        justifyContent: "center",
        "& > div": {
            padding: '5px'
        }
    }
}));

const ObserverItem = styled('div')(( {theme, isShow = true} ) => ({
    display: isShow ? 'block' : 'none',
    width: '100%',
    height: '20px',
    background: 'red',
}));


const UploadNavigateButton = styled(Button)(( {theme} ) => ({
    backgroundColor: '#0043AD',
    color: 'white',
    "&: hover": {
        backgroundColor: '#01214f',
        color: 'white'
    }
}));

const FollowButton = styled(Button)(( {theme, isSubscribe = false} ) => ({
    backgroundColor: isSubscribe ? '#EA0000' : '#584f4f',
    color: 'white',
    "&: hover": {
        backgroundColor:  isSubscribe ? '#A30000' : "#2d2626",
        color: 'white'
    }
}));

const ImageWrapper = styled(JustifyContent)(({theme, maxHeight = ''}) => ({
    margin: '15px 0',
    minHeight: '50px',
    maxHeight: maxHeight,
    cursor: 'pointer',
}));




export {
    FlexBox,
    JustifyContent,
    AlignItem,
    JustifyBox,
    JustifyWrap,
    JustifyStart,
    JustifySpaceBetween,
    ErrorSpan,

    IconWrapper,
    FollowWrapper,

    ObserverItem,

    UploadNavigateButton,
    FollowButton,

    ImageWrapper
}

