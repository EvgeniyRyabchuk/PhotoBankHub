

// styled components
import {Card, styled, Tab} from "@mui/material";
import {FlexBox} from "../../assets/shared/styles";
import {TabList, TabPanel} from "@mui/lab";

const StyledCard = styled(Card)(() => ({
    position: "relative",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
    top: -20,
    alignItems: "center",
    position: "relative",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    fontSize: 13,
    color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
    [theme.breakpoints.down(780)]: {
        width: "100%",
        "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
        },
        marginBottom: 20,
    },
    [theme.breakpoints.up("sm")]: {
        "& .MuiTabs-flexContainer": {
            minWidth: 400,
            justifyContent: "space-between",
        },
    },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
    padding: 0,
}));

export {
    StyledCard,
    ContentWrapper,
    StyledTab,
    StyledTabList,
    StyledTabPanel
}