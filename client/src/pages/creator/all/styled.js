
// styled component
import {styled} from "@mui/material";
import {FlexBox} from "../../../assets/shared/styles";

const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
    [theme.breakpoints.down(500)]: {
        width: "100%",
        "& .MuiInputBase-root": { maxWidth: "100%" },
        "& .MuiButton-root": {
            width: "100%",
            marginTop: 15,
        },
    },
}));


export {
    StyledFlexBox
}