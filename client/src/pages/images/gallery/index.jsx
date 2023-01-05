import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Gallery} from "react-grid-gallery";
import './style.scss';
import FsLightbox from "fslightbox-react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import {defLimit, defPage, searchParamSeparator} from "../../../utills/const";
import ImageService from "../../../services/ImageService";
import {getPageCount} from "../../../utills/pages";
import {useFetching} from "../../../hooks/useFetching";
import {getPreview} from "../../../utills/axios";
import {Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {JustifyBox, JustifyContent} from "../../../assets/shared/styles";
import GalleryFilter from "../../../components/GalleryFilter";
import defOrderSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {FilterAlt, Sort} from "@mui/icons-material";


//TODO: hide default value in search params
//TODO: sort


const ImageGalleryPage = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const lastElementRef = useRef();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const [page, setPage] = useState(searchParams.get('page') ?? defPage);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(searchParams.get('limit') ?? defLimit);

    const [sort, setSort] = useState( searchParams.get('sort') ?? 'created_at');
    const [order, setOrder] = useState(searchParams.get('orderDirection') ?? 'desc');

    const [filterOptionData, setFilterOptionData] = useState({
        asd: '123',
        levels: searchParams.get('levels') && searchParams.get('levels').split(searchParamSeparator),
        createdAtRange: searchParams.get('created_at_range') && searchParams.get('created_at_range').split(searchParamSeparator),
    });

    console.log(filterOptionData);

    const [isShowMoreMode, setIsShowMoreMode] = useState(false);

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

    const [fetchImages, isLoading, error ] = useFetching(async () => {
        const { data } = await ImageService.getAll(location.search);
        const total = getPageCount(data.total, limit);
        setTotalPage(total);

        const newImagesWithLayout = getImagesWithOverlay(data.data);

        if(isShowMoreMode)
            setImages([...images, ...newImagesWithLayout]);
        else
            setImages(newImagesWithLayout);
    });

    useEffect(() => {
        if(!isShowMoreMode)
            window.scrollTo(0, 0);
        fetchImages();
    }, [searchParams]);


    const changeSearchParams = () => {
        const formattedFilter = {};
        if(filterOptionData) {
            if(filterOptionData.levels)
                formattedFilter.levels = filterOptionData.levels.join(searchParamSeparator);
            if(filterOptionData.createdAtRange)
                formattedFilter.created_at_range = filterOptionData.createdAtRange.join(searchParamSeparator);
        }

        setSearchParams({
            'page': page,
            'limit': limit,
            'order': sort,
            'orderDirection': order,
            // 'search': debouncedSearch,
            ...formattedFilter,
        });
    }


    useEffect(() => {
        changeSearchParams();
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

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const handlerFilterChange = useCallback((data, isReset) => {
        setFilterOptionData({...data});
        setPage(defPage);
        setLimit(defLimit);
        console.log('on filter change', data);
    }, []);

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

            <Box sx={{ my: 3}}>
                <JustifyContent>
                    <Select
                        size='small'
                        style={{ minWidth: '200px' }}
                        labelId="demo-select-small"
                        id="demo-select-small"
                        defaultValue='2'
                        label="Sort"
                        onChange={(e) => onSortOrderHandleChange(e)}
                    >
                        { defOrderSortOrderData.map((e) =>
                            <MenuItem
                                key={e.id}
                                value={e.id}>
                                <IconButton
                                    size="small"
                                    color="primary"
                                    className="text-primary"
                                    title="View details"
                                    onClick={() => setIsSortOpen(!isSortOpen)}>
                                    <Sort/>
                                </IconButton>
                                { getSortOrderOptionValue(e) }
                            </MenuItem>
                        )
                        }
                    </Select>

                    <IconButton
                        size="small"
                        color="primary"
                        className="text-primary"
                        title="View details"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        style={{
                            border: '1px dashed gray',
                            height: 'auto',
                            padding: '0px 50px',
                            borderRadius: '1px'
                        }}
                    >
                        Filter
                        <FilterAlt/>

                    </IconButton>

                </JustifyContent>

                <GalleryFilter
                    isOpen={isFilterOpen}
                    onFilterChange={handlerFilterChange}
                    defaultState={filterOptionData}
                />
            </Box>

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

                <JustifyBox sx={{ my: 5 }}>
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPage}
                            defaultPage={defPage}
                            siblingCount={2}
                            page={page}
                            onChange={onPageChange}
                            color='primary'
                        />
                    </Stack>

                    <Box sx={{ width: 200 }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                defaultValue={15}
                                value={limit}
                                label="Per page"
                                onChange={onLimitChange}
                            >
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                            </Select>
                        </FormControl>
                        <Button sx={{ minHeight: '100%'}} variant='outlined' type='button' onClick={showMore}>
                            Show More
                        </Button>
                    </Box>


                </JustifyBox>

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