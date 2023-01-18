import React, {useEffect, useRef, useState} from 'react';
import {Box, CircularProgress, Divider, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {defLimit, defPage} from "../../../utills/const";
import {useFetching} from "../../../hooks/useFetching";
import ClientService from "../../../services/ClientService";
import {getImagesWithOverlay} from "../../images/shared";
import {getPageCount} from "../../../utills/page";
import CollectionService from "../../../services/CollectionService";
import {useObserver} from "../../../hooks/useObserver";
import {Gallery} from "react-grid-gallery";
import {ObserverItem} from "../../../assets/shared/styles";

const Collection = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector(state => state.user);
    const lastElementRef = useRef();
    const [page, setPage] = useState(defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [images, setImages] = useState([]);
    const [collection, setCollection] = useState([]);

    const [fetchImagesByCollection, isLoading, error] = useFetching(async () => {
        const { data } = await CollectionService.getImagesByCollection(id);
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
        setCollection(data.collection);
    });


    useObserver(lastElementRef, page < totalPage, isLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchImagesByCollection();
    }, [page]);

    const handleClick = (index, item) => navigate(`/images/${item.id}`);


    return (
        <Box sx={{ my: 3 }}>
            Collection

            { isLoading && <CircularProgress />}
            {
                !isLoading &&
                <>
                    <Typography variant='h4'>
                        Name: {collection.name}
                    </Typography>
                    <Divider/>
                    <Typography variant='span'>
                        Description: {collection.description}
                    </Typography>
                    <Divider/>

                    <Box sx={{ my: 5}}>
                        <Gallery
                            images={images}
                            enableImageSelection={true}
                            onClick={handleClick}
                        />
                        { !isLoading && images.length === 0 &&
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

export default Collection;