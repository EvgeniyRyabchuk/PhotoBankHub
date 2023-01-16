import {Box, styled} from "@mui/material";

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




export {
    FlexBox,
    JustifyContent,
    AlignItem,
    JustifyBox,
    JustifyWrap,
    JustifySpaceBetween,
    ErrorSpan,

    IconWrapper,
    FollowWrapper
}

