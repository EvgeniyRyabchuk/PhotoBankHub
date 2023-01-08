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

export {
    FlexBox,
    JustifyContent,
    AlignItem,
    JustifyBox,
    JustifyWrap,
    JustifySpaceBetween,
    ErrorSpan,
}

