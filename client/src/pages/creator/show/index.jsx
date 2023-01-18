import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, CircularProgress} from "@mui/material";
import CreatorService from "../../../services/CreatorService";
import {useNavigate, useParams} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import FollowerIcon from "../../../assets/icons/FollowerIcon";
import {BusinessCenter, Mail, Place} from "@mui/icons-material";
import ProfileHeader from "../../../components/userProfile/ProfileHeader";
import {useFetching} from "../../../hooks/useFetching";
import {TabContext} from "@mui/lab";
import {StyledTabPanel} from "../../profile/styled";
import Profile from "../../../components/userProfile/Profile";
import CreatorGallery from "./CreatorGallery";
import {CollectionCard} from "../../collections/all";

const details = [
    {
        Icon: Place,
        boldText: "Kuwait",
        smallText: "Lives at",
    },
    {
        Icon: Mail,
        boldText: "",
        smallText: "Lenore_Rosenbaum@gmail.com",
    },
    {
        Icon: BusinessCenter,
        boldText: "UI_LIB",
        smallText: "Manager at",
    },
    {
        Icon: BusinessCenter,
        smallText: "Studied at",
        boldText: "Corwin - Blick",
    },
];

const postList = [
    {
        id: 1,
        postTitle: "Coffee and Afternoon",
        postImage: "/static/post-image/post-1.png",
    },
    {
        id: 2,
        postTitle: "Coffee and Afternoon",
        postImage: "",
    },
];


const getCountListForCreator = (creator, short = false) => {
    return [
        {
            title: 'Followers',
            value: creator.subscribes_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Downloads',
            value: creator.total_downloads_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Views',
            value: creator.total_views_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Likes',
            value: creator.total_likes_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Images',
            value: creator.images_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
    ]
}

const CreatorShow = () => {

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const navigate = useNavigate();

    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [collections, setCollections] = useState(null);

    const countList = useMemo(() => {
        if(!creator) return [];
        return getCountListForCreator(creator);
    }, [creator]);

    const [fetchCreator, isLoadingCreator, errorCreatorLoading] = useFetching(async () => {
        const { data } = await CreatorService.getCreator(id);
        setCreator(data.creator);
        setCollections(data.collections);
    });

    useEffect(() => {
        fetchCreator();
    }, []);


    const [value, setValue] = useState("1");

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ p: 5}}>
            <TabContext value={value}>
                {isLoadingCreator && <CircularProgress />}
                { !isLoadingCreator && creator && creator !== null &&
                    <>
                        <ProfileHeader
                            isMyProfile={false}
                            user={creator.user}
                            creator={creator}
                            tabList={[
                                { label: 'Overview', value: '1' }
                            ]}
                        />

                        <Box marginTop={3}>
                            <StyledTabPanel value="1">
                                <Profile
                                    counterFullWidth={true}
                                    isPostShow={false}
                                    countList={countList}
                                    user={creator.user}
                                />
                            </StyledTabPanel>
                        </Box>

                        {/* //TODO: show all collections */}

                        <Box sx={{ my: 2 }}>
                            <Box sx={{  display: 'flex',  flexWrap: 'wrap', }}>
                                {
                                    collections.slice(0, 3).map(c =>
                                        <CollectionCard collection={c} isBottomMenuShow={false} />
                                    )
                                }
                            </Box>
                            <Button onClick={() => navigate(`/creators/${creator.id}/collections`)}>
                                Show More
                            </Button>
                        </Box>


                        <CreatorGallery creatorId={creator.id} />
                    </>
                }
            </TabContext>
        </Box>
    );
};

export default CreatorShow;