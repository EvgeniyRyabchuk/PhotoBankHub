import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {defLimit, defPage} from "../../../utills/const";
import {useFetching} from "../../../hooks/useFetching";
import ClientService from "../../../services/ClientService";
import {getImagesWithOverlay} from "../../images/shared";
import {getPageCount} from "../../../utills/page";
import {useObserver} from "../../../hooks/useObserver";
import {Box, CircularProgress, Typography} from "@mui/material";
import {Gallery} from "react-grid-gallery";

const Views = () => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const lastElementRef = useRef();
    const [page, setPage] = useState(defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [images, setImages] = useState([]);

    const [fetchViews, isLoading, error] = useFetching(async () => {
        const { data } = await ClientService.getViews(user.client.id, page);
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
        fetchViews();
    }, [page]);

    const handleClick = (index, item) => navigate(`/images/${item.id}`);


    return (
        <Box sx={{ my: 3 }}>
            <Typography variant='h4'>
                Viewed Image List
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

export default Views;