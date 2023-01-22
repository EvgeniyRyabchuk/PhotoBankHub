import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {defLimit, defPage} from "../../../utills/const";
import {useFetching} from "../../../hooks/useFetching";
import ClientService from "../../../services/ClientService";
import {getImagesWithOverlay} from "../../images/shared";
import {getPageCount} from "../../../utills/page";
import {useObserver} from "../../../hooks/useObserver";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {Gallery} from "react-grid-gallery";
import {JustifyContent, ObserverItem} from "../../../assets/shared/styles";
import FavoriteService from "../../../services/FavoriteService";

const Favorite = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    const lastElementRef = useRef();
    const [page, setPage] = useState(defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [images, setImages] = useState([]);
    const [favorite, setFavorite] = useState([]);

    const [fetchImagesByFavorite, isLoading, error] = useFetching(async () => {
        const { data } = await ClientService.getImageByFavorite(user.client.id, id, page);
        const newImagesWithLayout = getImagesWithOverlay(data.images.data);

        setTotalPage(getPageCount(data.images.total, defLimit));

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
        setFavorite(data.favorite);
    });

    useObserver(lastElementRef, page < totalPage, isLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchImagesByFavorite();
    }, [page]);

    const handleClick = (index, item) => navigate(`/images/${item.id}`);

    const hasSelected = images.some((image) => image.isSelected);

    const handleSelect = (index) => {
        const nextImages = images.map((image, i) =>
            i === index ? { ...image, isSelected: !image.isSelected } : image
        );
        setImages(nextImages);
    };

    const handleSelectAllClick = () => {
        const nextImages = images.map((image) => ({
            ...image,
            isSelected: !hasSelected,
        }));
        setImages(nextImages);
    };

    const selectedImages = useMemo(() => {
        return images.filter(i => i.isSelected);
    }, [images]);


    const undo = () => {
        setImages(images.map(i => {
            i.isSelected = false; return i;
        }));
    }

    const handleDelete = async () => {
        const ids = selectedImages.map(i => i.id).join(',');
        const { data } = await FavoriteService.removeImagesFromFavorite(user.client.id, favorite.id, ids);
        const newImagesWithLayout = getImagesWithOverlay(data.data);
        setTotalPage(getPageCount(data.total, defLimit));
        setPage(defPage);
        setImages(newImagesWithLayout);
    }

    return (
        <Box sx={{ my: 3 }}>
            { isLoading && <CircularProgress />}
            { !isLoading &&
                <>
                    <Typography variant='h4'>
                        Favorite: {favorite.title}
                    </Typography>

                    <Box sx={{ my: 5}}>
                        <JustifyContent sx={{ "& > button": {margin: '0 5px'}, justifyContent: 'space-between', px: 5}}>
                            <Box>
                                <Button variant='contained' color={hasSelected ? 'secondary' : 'primary'} onClick={handleSelectAllClick}>
                                    {hasSelected ? "Clear selection" : "Select all"}
                                </Button>
                                {selectedImages.length > 0 &&
                                    <>
                                        <Button variant='contained' color='error' onClick={handleDelete}>
                                            Delete
                                        </Button>
                                        <Button variant='contained' onClick={undo}>
                                            Undo
                                        </Button>
                                    </>
                                }
                            </Box>
                            <Box>
                                <Typography variant='p'>
                                    Selected Images: {selectedImages.length}
                                </Typography>
                            </Box>

                        </JustifyContent>

                        <Gallery
                            images={images}
                            onSelect={handleSelect}
                            enableImageSelection={true}
                            onClick={handleClick}
                        />
                        {
                            !isLoading && images.length === 0 &&
                            <h3>No data</h3>
                        }
                        { isLoading && <CircularProgress /> }
                        <ObserverItem ref={lastElementRef} />
                    </Box>
                </>

            }
        </Box>
    );
};

export default Favorite;