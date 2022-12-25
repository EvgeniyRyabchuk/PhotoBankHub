import React, {useState} from 'react';

import { Box, Card, Grid, styled, Tab } from "@mui/material";
import {FlexBox} from "../../assets/shared/styles/index";
import SearchInput from "../../components/UI/SearchInput";
import { H3, Small } from "../../assets/typography";
import UkoAvatar from "../../components/UI/UkoAvatar";
import FollowerCard from "../../components/userProfile/FollowerCard";
import FriendCard from "../../components/userProfile/FriendCard";
import Gallery from "../../components/userProfile/Gallery";
import Profile from "../../components/userProfile/Profile";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {useSelector} from "react-redux";
import {getAvatar} from "../../utills/axios";
import {ContentWrapper, StyledCard, StyledTab, StyledTabList, StyledTabPanel} from "./styled";


const followers = [
    {
        image: "/static/avatar/040-man-11.svg",
        name: "Mr. Breast",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "/static/avatar/041-woman-11.svg",
        name: "Ethan Drake",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/042-vampire.svg",
        name: "Selena Gomez",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/043-chef.svg",
        name: "Sally Becker",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/044-farmer.svg",
        name: "Dua Lipa",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/045-man-12.svg",
        name: "Joe Murry",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "/static/avatar/040-man-11.svg",
        name: "Mr. Breast",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "/static/avatar/041-woman-11.svg",
        name: "Ethan Drake",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/042-vampire.svg",
        name: "Selena Gomez",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/043-chef.svg",
        name: "Sally Becker",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/044-farmer.svg",
        name: "Dua Lipa",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/045-man-12.svg",
        name: "Joe Murry",
        profession: "Product Designer",
        following: true,
    },
];

const friends = [
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
];


const ProfilePage = () => {
    // change navbar title
    // useTitle("User Profile");
    // const { user } = useAuth();

    const { user } = useSelector(store => store.user);

    const [value, setValue] = useState("1");

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Box pt={2} pb={4}>
            <TabContext value={value}>
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

                        <StyledTabList onChange={handleChange}>
                            <StyledTab label="Profile" value="1" />
                            <StyledTab label="Follower" value="2" />
                            <StyledTab label="Friends" value="3" />
                            <StyledTab label="Gallery" value="4" />
                        </StyledTabList>
                    </FlexBox>
                </StyledCard>

                <Box marginTop={3}>
                    <StyledTabPanel value="1">
                        <Profile />
                    </StyledTabPanel>

                    <StyledTabPanel value="2">
                        <Grid container spacing={3}>
                            {followers.map((item, index) => (
                                <Grid item lg={4} sm={6} xs={12} key={index}>
                                    <FollowerCard follower={item} />
                                </Grid>
                            ))}
                        </Grid>
                    </StyledTabPanel>

                    <StyledTabPanel value="3">
                        <H3>Friends</H3>
                        <SearchInput placeholder="Search Friends..." sx={{ my: 2 }} />

                        <Grid container spacing={3}>
                            {friends.map((friend, index) => (
                                <Grid item lg={4} sm={6} xs={12} key={index}>
                                    <FriendCard friend={friend} />
                                </Grid>
                            ))}
                        </Grid>
                    </StyledTabPanel>

                    <StyledTabPanel value="4">
                        <Gallery />
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

