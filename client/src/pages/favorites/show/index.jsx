import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {defLimit, defPage} from "../../../utills/const";
import {useFetching} from "../../../hooks/useFetching";
import ClientService from "../../../services/ClientService";
import {getImagesWithOverlay} from "../../images/shared";
import {getPageCount} from "../../../utills/page";
import {useObserver} from "../../../hooks/useObserver";
import {Box, CircularProgress, Typography} from "@mui/material";
import {Gallery} from "react-grid-gallery";

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


    return (
        <Box sx={{ my: 3 }}>
            { isLoading && <CircularProgress />}
            {
                !isLoading &&
                <>
                    <Typography variant='h4'>
                        Favorite: {favorite.title}
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
                </>

            }
        </Box>
    );
};

export default Favorite;