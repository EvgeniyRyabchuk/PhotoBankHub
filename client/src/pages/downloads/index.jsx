import React from 'react';
import {Box, Button, styled} from "@mui/material";
import {FlexBox} from "../../assets/shared/styles";
import {useNavigate} from "react-router-dom";
import {userListFakeData} from "../../components/userManagement/fakeData";
import UserListColumnShape from "../../components/userManagement/columnShape";
import CustomTable from "../../components/userManagement/CustomTable";
import SearchInput from "../../components/UI/SearchInput";
import {StyledFlexBox} from "./styled";


const Downloads = () => {
    const navigate = useNavigate();
    const handleAddUser = () => navigate("/dashboard/add-user");


    return (
        <Box pt={2} pb={4} mx={4} mt={4}>
            <StyledFlexBox>
                <SearchInput placeholder="Search user..." />
                <Button variant="contained" onClick={handleAddUser}>
                    Add New User
                </Button>
            </StyledFlexBox>

            <CustomTable columnShape={UserListColumnShape} data={userListFakeData} />
        </Box>
    );
};

export default Downloads;