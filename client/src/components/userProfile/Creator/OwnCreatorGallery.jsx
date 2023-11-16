import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {defLimit, defPage} from "../../../utills/const";
import {useFetching} from "../../../hooks/useFetching";
import ClientService from "../../../services/ClientService";
import {getImagesWithOverlay} from "../../../pages/images/shared";
import {getPageCount} from "../../../utills/page";
import {useObserver} from "../../../hooks/useObserver";
import ImageService from "../../../services/ImageService";
import {Box, CircularProgress, Typography} from "@mui/material";
import {Gallery} from "react-grid-gallery";
import {ObserverItem} from "../../../assets/shared/styles";

const OwnCreatorGallery = ({ preview = false, ...props}) => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const lastElementRef = useRef();
    const [page, setPage] = useState(defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [images, setImages] = useState([]);

    const [fetchImages, isLoading, error] = useFetching(async () => {
        const { data } = await ImageService.getAll(`?creatorId=${user.creator.id}`);
        const newImagesWithLayout = getImagesWithOverlay(data.data);

        setTotalPage(getPageCount(data.total, defLimit));

        if(page > 1) {
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
        fetchImages();
    }, [page]);

    const handleClick = (index, item) => navigate(`/images/${item.id}`);


    return (
        <Box {...props}>
            { !preview &&
                <Typography variant='h4'>
                    My Image Galley
                </Typography>
            }

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
                <ObserverItem ref={lastElementRef} isShow={!preview} />

            </Box>
        </Box>
    );
};

export default OwnCreatorGallery;