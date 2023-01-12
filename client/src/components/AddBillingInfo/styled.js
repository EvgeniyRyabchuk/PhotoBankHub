
// styled components
import {alpha, Box, styled} from "@mui/material";

const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: 100,
    height: 100,
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.secondary[200]
            : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    border: "2px solid",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.palette.background.paper,
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.secondary[400]
            : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
}));


export {
    ButtonWrapper,
    UploadButton,
    SwitchWrapper
}