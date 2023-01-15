import React from 'react';
import {Typography} from "@mui/material";

import { Box, Button, Grid, styled } from "@mui/material";

import { useNavigate } from "react-router-dom";
import {userList} from "./fakeData";
import SearchInput from "../../../components/UI/SearchInput";
import UserCard from "../../../components/userManagement/UserCard";
import {FlexBox} from "../../../assets/shared/styles";


// styled component
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

const AllCreators = () => {

    const navigate = useNavigate();
    const handleAddUser = () => navigate("/dashboard/add-user");

    return (
        <div>
            <Typography variant='h5'>
                All Creators
            </Typography>

            <Box pt={2} pb={4}>
                <StyledFlexBox>
                    <SearchInput placeholder="Search user..." />
                    <Button variant="contained" onClick={handleAddUser}>
                        Add New User
                    </Button>
                </StyledFlexBox>

                <Grid container spacing={3}>
                    {userList.map((user, index) => (
                        <Grid item md={4} sm={6} xs={12} key={index}>
                            <UserCard user={user} />
                        </Grid>
                    ))}
                </Grid>
            </Box>


        </div>
    );
};

export default AllCreators;