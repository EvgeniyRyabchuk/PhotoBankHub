import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Gallery} from "react-grid-gallery";
import './style.scss';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import {defLimit, defOrder, defPage, defSort} from "../../../utills/const";
import ImageService from "../../../services/ImageService";
import {getPageCount} from "../../../utills/pages";
import {useFetching} from "../../../hooks/useFetching";
import {Box, CircularProgress, IconButton, MenuItem, Select} from "@mui/material";
import {JustifyContent} from "../../../assets/shared/styles";
import GalleryFilter from "../../../components/GalleryFilter";
import defOrderSortOrderData, {getSortOrderOptionValue} from "./sortOptions";
import {FilterAlt, Sort} from "@mui/icons-material";
import {getImagesWithOverlay} from "../shared";
import PaginationBar from "../../../components/PaginationBar";
import {toInteger} from "lodash/lang";
import useLoadParam from "../../../hooks/useLoadParam";


const ImageGalleryPage = () => {

    const loadParam = useLoadParam();
    const [isInitialized, setIsInitialized] = useState(false);

    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const lastElementRef = useRef();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const [page, setPage] = useState(loadParam('page', defPage, true));
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(loadParam('limit', defLimit, true));

    const [sort, setSort] = useState(loadParam('sort', defSort));
    const [order, setOrder] = useState(loadParam('orderDirection', defOrder));

    const [filterOptionData, setFilterOptionData] = useState();


    const [isShowMoreMode, setIsShowMoreMode] = useState(false);


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
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if(!isShowMoreMode)
            window.scrollTo(0, 0);
        fetchImages();
    }, [searchParams]);


    const getOnlyChangedFilterParams = (data) => {
        const formattedFilter = {};
        for (let i in data) {
            const value = data[i];
            if(value === null || value === '' || value === undefined) {
                continue;
            } else if (Array.isArray(value) && value.length === 0) {
                continue;
            }
            formattedFilter[i] = value;
        }

        if(page !== defPage)
            formattedFilter.page = page;
        if(limit !== defLimit)
            formattedFilter.limit = limit;
        if(order !== defOrder)
            formattedFilter.order = order;
        if(sort !== defSort)
            formattedFilter.sort = sort;

        return formattedFilter;
    }

    const changeSearchParams = () => {
        const formattedFilter = getOnlyChangedFilterParams(filterOptionData);
        setSearchParams({
            ...formattedFilter,
        });
    }

    useEffect(() => {
        if(isInitialized)
            changeSearchParams();
    }, [page, limit, sort, order, debouncedSearch, filterOptionData]);

    const onSortOrderHandleChange = (event) => {
        const value = event.target.value;
        const option = defOrderSortOrderData.find((e) => e.id == value);
        if (option) {
            setSort(option.value);
            setOrder(option.order);
            setPage(defPage);
            setLimit(defLimit);
        }
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
        // setLightboxController({
        //     toggler: !lightboxController.toggler,
        //     slide: index + 1
        // })
        navigate(`/images/${item.id}`);
    }

    const onPageChange = (e, value) => {
        setPage(value);
        setIsShowMoreMode(false);
    }

    const onLimitChange = (e) => {
        setLimit(e.target.value);
        setPage(1);
        setIsShowMoreMode(false);
    }

    const showMore = (e) => {
        setPage(toInteger(page) + 1);
        setIsShowMoreMode(true);
    }

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const handlerFilterChange = useCallback((data, isReset) => {
        setFilterOptionData({...data});
        setPage(defPage);
        setLimit(defLimit);
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
                    onClose={() => setIsFilterOpen(false)}
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

                <PaginationBar limit={limit} page={page} totalPage={totalPage}
                    onLimitChange={onLimitChange}
                    onPageChange={onPageChange}
                    onShowMore={showMore}
                />
            </Box>


            {/*<FsLightbox*/}
            {/*    toggler={lightboxController.toggler}*/}
            {/*    sources={images.map(i => i.src)}*/}
            {/*    slide={lightboxController.slide}*/}
            {/*    types={[...new Array(images.length).fill('image')]}*/}
            {/*/>*/}

        </div>
    );
};

export default ImageGalleryPage;