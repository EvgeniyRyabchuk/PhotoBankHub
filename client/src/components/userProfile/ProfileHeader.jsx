import React from 'react';
import {ContentWrapper, StyledCard, StyledTab, StyledTabList} from "../../pages/profile/styled";
import {Box, Button} from "@mui/material";
import {FlexBox} from "../../assets/shared/styles";
import UkoAvatar from "../UI/UkoAvatar";
import {getAvatar} from "../../utills/axios";
import {H3, Small} from "../../assets/typography";

const ProfileHeader = ({ onChange, user, tabList}) => {

    return (
            <StyledCard>
                <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
                    <img
                        src="/static/background/user-cover-pic.png"
                        alt="User Cover"
                        height="100%"
                        width="100%"
                        style={{ objectFit: "cover" }}
                    />
                </Box>

                <FlexBox
                    flexWrap="wrap"
                    padding="0 2rem"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <ContentWrapper>
                        <UkoAvatar
                            src={getAvatar(user) ?? "/static/avatar/001-man.svg"}
                            sx={{
                                border: 4,
                                width: 100,
                                height: 100,
                                borderColor: "background.paper",
                            }}
                        />

                        <Box marginLeft={3} marginTop={3}>
                            <H3 lineHeight={1.2}>{user.full_name}</H3>
                            <Small color="text.disabled">{user.role.name}</Small>
                        </Box>
                    </ContentWrapper>

                    <Box>
                        <Button
                            variant='container'
                            sx={{
                                backgroundColor: '#EA0000',
                                color: 'white',
                                "&: hover": {
                                    backgroundColor: '#A30000',
                                    color: 'white'
                                }
                            }}
                            onClick={() => {
                                // TODO: follow
                                // check if already following

                            }}
                        >
                            Follow
                        </Button>
                        <Button
                            variant='container'
                            sx={{
                                backgroundColor: '#0043AD',
                                color: 'white',
                                "&: hover": {
                                    backgroundColor: '#00378B',
                                    color: 'white'
                                }
                            }}
                            color='primary'
                            onClick={() => {}}>
                            Upload Image
                        </Button>

                    </Box>

                    {
                        tabList &&
                        <StyledTabList onChange={onChange}>
                            {
                                tabList.map((tab, index) =>
                                    <StyledTab key={index} label={tab.label} value={tab.value} />
                                )
                            }
                        </StyledTabList>
                    }

                </FlexBox>
            </StyledCard>
    );
};

export default ProfileHeader;