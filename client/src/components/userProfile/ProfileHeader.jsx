import React, {useMemo} from 'react';
import {ContentWrapper, StyledCard, StyledTab, StyledTabList} from "../../pages/profile/styled";
import {Box, Button} from "@mui/material";
import {FlexBox, FollowButton, UploadNavigateButton} from "../../assets/shared/styles";
import UkoAvatar from "../UI/UkoAvatar";
import {getAvatar} from "../../utills/axios";
import {H3, Small} from "../../assets/typography";
import ClientService from "../../services/ClientService";
import {useSelector} from "react-redux";
import {useAction} from "../../hooks/useAction";
import userRole from "../../auth/roles";
import {useNavigate} from "react-router-dom";




const ProfileHeader = ({ onChange, user, creator, tabList, isMyProfile}) => {

    const navigate = useNavigate();
    const { user: authUser, isAuth} = useSelector(store => store.user);
    const { profile } = useAction();

    const isSubscribe = useMemo(() => {
        if(!creator) return;
        if(!isAuth) return false;
        if(authUser.role.name !== userRole.Client) return false;
        if(creator.user.id === authUser.id) return;
        const exist = authUser.client.content_subscriptions.find(following => following.id === creator.id);
        return !exist ? true : false;
    }, [authUser, creator]);


    const subscribeHandler = async () => {
        if(!isAuth) navigate(`/login`);
        if(authUser.role.name !== userRole.Client) navigate(`/login`);
        if(isSubscribe)
            await ClientService.contentSubscribe(authUser.client.id, creator.id);
        else
            await ClientService.contentUnSubscribe(authUser.client.id, creator.id);
        await profile();
    }


    return (
            <StyledCard>
                <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
                    <img src="/static/background/user-cover-pic.png"
                        alt="User Cover"
                        height="100%"
                        width="100%"
                        style={{ objectFit: "cover", height: '100%'}}
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
                        {
                            !isMyProfile && isAuth && authUser.role.name === userRole.Client &&
                            <FollowButton isSubscribe={isSubscribe} onClick={subscribeHandler}>
                                { isSubscribe ? 'Follow' : 'Unfollow'}
                            </FollowButton>
                        }
                        {
                            isMyProfile && isAuth && authUser.role.name === userRole.Creator &&
                            <UploadNavigateButton variant='container' onClick={() => navigate(`/uploads`) }>
                                Upload Image
                            </UploadNavigateButton>
                        }
                    </Box>

                    { tabList &&
                        <StyledTabList onChange={onChange}>
                            { tabList.map((tab, index) =>
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