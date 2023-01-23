import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, styled, Typography} from "@mui/material";
import {NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import SearchInput from "../../../components/UI/SearchInput";
import UserCard from "../../../components/userManagement/UserCard";
import {FlexBox} from "../../../assets/shared/styles";
import CreatorService from "../../../services/CreatorService";
import {defLimit, defOrder, defPage, defSort} from "../../../utills/const";
import useDebounce from "../../../hooks/useDebounce";
import {useFetching} from "../../../hooks/useFetching";
import {getAvatar} from "../../../utills/axios";
import {getPageCount} from "../../../utills/page";
import PaginationBar from "../../../components/PaginationBar";
import {getRandomInt} from "../../../utills/utils";
import {StyledFlexBox} from "../../history/downloads/styled";



const AllCreators = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const [page, setPage] = useState(searchParams.get('page') ?? defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(searchParams.get('limit') ?? defLimit);

    const [sort, setSort] = useState( searchParams.get('sort') ?? defSort);
    const [order, setOrder] = useState(searchParams.get('orderDirection') ?? defOrder);

    const [isShowMoreMode, setIsShowMoreMode] = useState(false);

    const handleAddUser = () => navigate("/dashboard/add-user");
    const [creators, setCreators] = useState([]);

    const [fetchCreators, isLoading, error] = useFetching(async () => {
        const { data } = await CreatorService.getAllCreator(location.search);

        const formatted = data.data.map(creator => {
            return {
                id: creator.id,
                cover: `/static/cover/cover-${getRandomInt(1, 6)}.png`,
                avatar: getAvatar(creator.user),
                name: creator.user.full_name,
                position: "Creator",
                subscribes: creator.subscribes_count,
                images: creator.images_count,
                likes: creator.total_likes_count,
                views: creator.total_views_count,
                downloads: creator.total_downloads_count
            }
        });
        setTotalPage(getPageCount(data.total, limit));
        if(isShowMoreMode)
            setCreators([...creators, ...formatted]);
        else
            setCreators(formatted);
    })

    useEffect(() => {
        if(!isShowMoreMode)
            window.scrollTo(0, 0);
        fetchCreators();
    }, [searchParams])

    useEffect(() => {
        const params = {};
        if(page !== defPage) params.page = page;
        if(limit !== defLimit) params.limit = limit;
        if(search !== '') params.search = search;
        setSearchParams(params);
    }, [page, limit, debouncedSearch])


    const onPageChange = (e, value) => {
        setPage(value);
        setIsShowMoreMode(false);
    }

    const onLimitChange = (e) => {
        setLimit(e.target.value);
        setPage(1);
    }

    const showMore = (e) => {
        setPage(page + 1);
        setIsShowMoreMode(true);
    }

    return (
        <Box sx={{ p: 5}}>
            { isLoading && <CircularProgress /> }

            <Typography variant='h5'>
                All Creators
            </Typography>
            <Box pt={2} pb={4}>
                <StyledFlexBox>
                    <SearchInput
                        placeholder="Search creator by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => navigate(`/images`)}>
                        Go To Gallery
                    </Button>
                </StyledFlexBox>

                { !isLoading && creators.length > 0 ?
                <Grid container spacing={3}>
                    {creators.map((creator, index) => (
                        <Grid key={creator.id} item md={4} sm={6} xs={12}>
                            <NavLink to={`/creators/${creator.id}`}>
                                <UserCard user={creator} />
                            </NavLink>
                        </Grid>
                    ))}
                </Grid>
                : 'no data' }
            </Box>

            <PaginationBar limit={limit} page={page} totalPage={totalPage}
                   onLimitChange={onLimitChange}
                   onPageChange={onPageChange}
                   onShowMore={showMore}
            />
        </Box>
    );
};

export default AllCreators;