import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {imagesMock} from "./mock";
import { Gallery } from "react-grid-gallery";
import './style.scss';
import FsLightbox from "fslightbox-react";
import {useNavigate, useSearchParams} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import {defLimit, defPage} from "../../../utills/const";
import ImageService from "../../../services/ImageService";
import {getPageCount} from "../../../utills/pages";
import {useFetching} from "../../../hooks/useFetching";
import {searchPramsToString} from "../../../utills/page";
import {getPreview} from "../../../utills/axios";
import {Box, CircularProgress} from "@mui/material";
import {useObserver} from "../../../hooks/useObserver";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ImageGalleryPage = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const lastElementRef = useRef();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(searchParams.get('page') ?? defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(searchParams.get('limit') ?? defLimit);

    const [sort, setSort] = useState( searchParams.get('sort') ?? 'created_at');
    const [order, setOrder] = useState(searchParams.get('order') ?? 'desc');

    const [filterOptionData, setFilterOptionData] = useState(null);


    const formattedImages = (images) => {
        const newImages = [];
        for(let image of images) {
            const originalSize = image.image_variants.find(v => v.size.name === 'ORIGINAL');
            const imageForamtted = {
                src: getPreview(image.preview),
                width: originalSize.width,
                height: originalSize.height,
                tags: image.tags.map(t => ({value: t.name, title: t.name}) ),
                caption: `${image.name} (${image.creator.user.full_name})`,
            };
            newImages.push(imageForamtted);
        };
        return newImages;
    }

    const getImagesWithOverlay = (images) => {
        const forattedImageList = formattedImages(images);
        return forattedImageList.map((image) => ({
            ...image,
            customOverlay: (
                <div className="custom-overlay__caption">
                    <div>{image.caption}</div>
                    {image.tags &&
                        image.tags.map((t, index) => (
                            <div key={index} className="custom-overlay__tag">
                                {t.title}
                            </div>
                        ))}
                </div>
            )}));
    };

    const [fetchOrders, isLoading, error ] = useFetching(async () => {

        const params = searchPramsToString(searchParams);
        const { data } = await ImageService.getAll(params);
        const total = getPageCount(data.total, limit);

        setTotalPage(total);

        const newImagesWithLayout = getImagesWithOverlay(data.data);
        setImages(newImagesWithLayout);
        // if(data.current_page > 1) {
        //     setImages([...images, ...newImagesWithLayout]);
        // }
        // else if(data.current_page === 1) {
        //     setImages([...newImagesWithLayout]);
        // }
        // else {
        //     setImages([]);
        // }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [searchParams])

    useEffect(() => {
        // setSearchParams({
        //     'page': page,
        //     'limit': limit,
        //     'order': sort,
        //     'orderDirection': order,
        // });
        fetchOrders();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    const onSortOrderHandleChange = (event) => {
        const value = event.target.value;
        // const option = defOrderSortOrderData.find((e: SortOrderOptionType) => e.id == value);
        // if (option) {
        //     setSort(option.value);
        //     setOrder(option.order);
        //     setPage(defPage);
        //     setLimit(defLimit);
        // }
    }
    const handlerFilterChange = useCallback((data, isReset) => {
        setFilterOptionData({...data});
        setPage(defPage);
        setLimit(defLimit);
    }, []);


    // useObserver(lastElementRef,page < totalPage, isLoading, () => {
    //     console.log('observer')
    //     setPage(page + 1);
    //     setSearchParams({
    //         ...searchParams,
    //         page: page + 1
    //     });
    // });


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

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const handleClick = (index, item) => {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: index + 1
        })
    }

    return (
        <div>
            <h1>Gallery</h1>

            {/*<button onClick={() => setToggler(!toggler)}>*/}
            {/*    Open the lightbox.*/}
            {/*</button>*/}

            <div className="p-t-1 p-b-1">
                <button onClick={handleSelectAllClick}>
                    {hasSelected ? "Clear selection" : "Select all"}
                </button>
            </div>

            <Box>
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
                <div ref={lastElementRef}
                     style={{
                         width: '100%',
                         height: '20px',
                         background: 'red',
                     }}>
                </div>

                <Stack spacing={2}>
                    <Pagination
                        count={totalPage}
                        defaultPage={defPage}
                        siblingCount={2}
                        page={page}
                        onChange={(e, value) => {
                            setPage(value);
                            setSearchParams({
                                ...searchParams,
                                page: value
                            });
                        }

                        }
                        color='primary'
                    />
                </Stack>
            </Box>


            <FsLightbox
                toggler={lightboxController.toggler}
                sources={images.map(i => i.src)}
                slide={lightboxController.slide}
                types={[...new Array(images.length).fill('image')]}
            />

        </div>
    );
};

export default ImageGalleryPage;