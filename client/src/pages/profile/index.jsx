import React, {lazy, useEffect, useMemo, useState} from 'react';
import {Box, Grid} from "@mui/material";
import SearchInput from "../../components/UI/SearchInput";
import {H3} from "../../assets/typography";
import FollowerCard from "../../components/userProfile/FollowerCard";
import FriendCard from "../../components/userProfile/FriendCard";
import Gallery from "../../components/userProfile/Gallery";
import Profile from "../../components/userProfile/Profile";
import {TabContext} from "@mui/lab";
import {useSelector} from "react-redux";
import {StyledTabPanel} from "./styled";
import {followers, friends, getCountListForClient, getCountListForCreator} from "./data";
import ProfileHeader from "../../components/userProfile/ProfileHeader";
import userRole from "../../auth/roles";
import ProfileSetting from "../../components/userProfile/ProfileSetting";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Loadable from "../../components/Loadable";
import OwnCreatorGallery from "../../components/userProfile/Creator/OwnCreatorGallery";
import Index from "../collections/all";
import Collections from "../collections/all";

const FavoritePage = Loadable(lazy(() => import('../favorites/all/index')));

const ProfilePage = () => {

    const { user } = useSelector(store => store.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const { search } = useLocation();
    const [value, setValue] = useState('1');

    useEffect(() => {
        window.scrollTo(0, 0);
        setValue(searchParams.get('tab') ?? '1');
    }, [search]);

    const handleChange = (_, newValue) => {
        setSearchParams({ ...searchParams, tab: newValue});
        setValue(newValue);
    };

    const countList = useMemo(() => {
        if(user.role.name === userRole.Client) {
            return getCountListForClient(user);
        } else if(user.role.name === userRole.Creator) {
            return getCountListForCreator(user);
        }
        return [];
    }, [user]);
    const tabList = useMemo(() => {
        if(user.role.name === userRole.Client) {
            return [
                { label: 'Profile', value: '1' },
                { label: 'Subscriptions', value: '2' },
                { label: 'Favorites', value: '3' },
                { label: 'Setting', value: '5' },
            ];
        } else if(user.role.name === userRole.Creator) {
            return [
                { label: 'Profile', value: '1' },
                { label: 'My Followers', value: '2' },
                { label: 'My Collections', value: '3' },
                { label: 'My gallery', value: '4' },
                { label: 'Setting', value: '5' },
            ];
        }
        return [];
    }, [user]);


    return (
        <Box pt={2} pb={4}>
            <TabContext value={value}>
                <ProfileHeader
                    isMyProfile={true}
                    user={user}
                    onChange={handleChange}
                    tabList={tabList}
                />

                <Box marginTop={3}>
                    <StyledTabPanel value="1">
                        <Profile
                            user={user}
                            countList={countList}
                        />
                    {/* //TODO: add my photos   */}
                    </StyledTabPanel>

                    <StyledTabPanel value="2">
                        { user.role.name === userRole.Client &&
                            <Grid container spacing={3}>
                                {user.client.content_subscriptions.map((creator, index) => (
                                    <Grid item lg={4} sm={6} xs={12} key={creator.id} >
                                        <FollowerCard follower={creator} />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                        {user.role.name === userRole.Creator &&
                            <Grid container spacing={3}>
                                {user.creator.subscribes.map((subscriber, index) => (
                                    <Grid item lg={4} sm={6} xs={12} key={subscriber.id} >
                                        <FollowerCard follower={subscriber} isUnfollowShow={false} />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    </StyledTabPanel>

                    <StyledTabPanel value="3">
                        { user.role.name === userRole.Creator &&
                            <Collections />
                        }
                        { user.role.name === userRole.Client &&
                            <FavoritePage />
                        }
                    </StyledTabPanel>

                    <StyledTabPanel value="4">
                        { user.role.name === userRole.Creator &&
                            <OwnCreatorGallery preview={false} />
                        }
                    </StyledTabPanel>

                    <StyledTabPanel value="5">
                        <ProfileSetting />
                    </StyledTabPanel>
                </Box>
            </TabContext>
        </Box>
    );
};


export default ProfilePage;


