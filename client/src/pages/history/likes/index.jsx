import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {useFetching} from "../../../hooks/useFetching";
import {useObserver} from "../../../hooks/useObserver";
import {defLimit, defPage} from "../../../utills/const";
import ClientService from "../../../services/ClientService";
import {getImagesWithOverlay} from "../../images/shared";
import {Gallery} from "react-grid-gallery";
import {Box, CircularProgress, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getPageCount} from "../../../utills/page";

const Likes = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const lastElementRef = useRef();
    const [page, setPage] = useState(defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [images, setImages] = useState([]);

    const [fetchLikes, isLoading, error] = useFetching(async () => {
        const { data } = await ClientService.getLikes(user.client.id, page);
        const newImagesWithLayout = getImagesWithOverlay(data.data);

        setTotalPage(getPageCount(data.total, defLimit));

        if(page > 1) {
            setImages(newImagesWithLayout);
            setImages([...images, ...newImagesWithLayout]);
        }
        else if(page === 1) {
            setImages([...newImagesWithLayout]);
        }
        else {
            setImages([]);
        }
    });

    useObserver(lastElementRef, page < totalPage, isLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchLikes();
    }, [page]);

    const handleClick = (index, item) => navigate(`/images/${item.id}`);

    console.log(images);

    return (
        <Box sx={{ my: 3 }}>
            <Typography variant='h4'>
                Liked Image List
            </Typography>

            <Box sx={{ my: 5}}>
                <Gallery
                    images={images}
                    // onSelect={handleSelect}
                    enableImageSelection={true}
                    onClick={handleClick}
                />
                {
                    !isLoading && images.length === 0 &&
                    <h3>No data</h3>
                }
                { isLoading && <CircularProgress /> }
                <div ref={lastElementRef}
                     style={{
                         width: '100%',
                         height: '20px',
                         background: 'red',
                     }}>
                </div>
            </Box>

        </Box>
    );
};

export default Likes;