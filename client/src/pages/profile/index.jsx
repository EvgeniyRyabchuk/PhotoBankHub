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

const FavoritePage = Loadable(lazy(() => import('../favorites/all/index')));

const ProfilePage = () => {

    const { user } = useSelector(store => store.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const { search } = useLocation();
    const [value, setValue] = useState('1');

    useEffect(() => {
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
                { label: 'Followers', value: '2' },
                { label: 'Collections', value: '3' },
                { label: 'Gallery', value: '4' },
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

                    </StyledTabPanel>

                    <StyledTabPanel value="3">
                        { user.role.name === userRole.Creator &&
                            <>
                                <H3>Friends</H3>
                                <SearchInput placeholder="Search Friends..." sx={{ my: 2 }} />

                                <Grid container spacing={3}>
                                    {friends.map((friend, index) => (
                                        <Grid item lg={4} sm={6} xs={12} key={index}>
                                            <FriendCard friend={friend} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        }
                        { user.role.name === userRole.Client &&
                            <FavoritePage />
                        }
                    </StyledTabPanel>

                    <StyledTabPanel value="4">
                        { user.role.name === userRole.Creator &&
                            <Gallery/>
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


// const Profile = () => {
//
//     const { user, isAuth } = useSelector(store => store.user);
//     const { profile } = useAction();
//
//     const [token, setToken] = useState('');
//     const sendVerifyEmail = async () => {
//         const data = await AuthService.sendEmailVerification();
//     }
//
//     const emailVerify = async () => {
//         const data = await AuthService.emailVerify(token);
//         profile();
//     }
//
//     const sendChangePasswordRequest = async () => {
//         const data = await AuthService.sendPasswordReset(user.email);
//     }
//
//     return (
//         <div>
//             <h1>Profile</h1>
//
//             <h3>Name: {user.full_name}</h3>
//             <h3>Email: {user.email}</h3>
//             <h3>About: {user.about}</h3>
//             <a href={user.website}>{user.website}</a>
//             <h3>{user.role.name}</h3>
//             <h3>Email verify: {user.email_verified_at ? 'yes' : 'no'}</h3>
//             <hr/>
//             <br/>
//
//             <Button variant='contained'
//             onClick={sendVerifyEmail}>
//                 Send Verify Email
//             </Button>
//
//             <br/>
//             <br/>
//
//             <input
//                 type="text"
//                 value={token}
//                 onChange={(e) =>
//                     setToken(e.target.value)
//                 }
//             />
//             <br/>
//             <br/>
//             <Button variant='contained'
//                     onClick={emailVerify}>
//                 Verify Email
//             </Button>
//
//             <br/>
//
//             <hr/>
//
//             <input
//                 type="text"
//                 value={user.email}
//             />
//
//             <Button
//                 variant='contained'
//                 onClick={sendChangePasswordRequest}
//             >
//                 Change Password
//             </Button>
//
//
//         </div>
//     );
// };

