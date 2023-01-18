import React, {useEffect, useState} from 'react';
import ImageService from "../../../services/ImageService";
import {useFetching} from "../../../hooks/useFetching";
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {getAvatar, getPreview} from "../../../utills/axios";
import {useNavigate, useParams} from "react-router-dom";
import FsLightbox from "fslightbox-react";
import Stack from "@mui/material/Stack";
import {
    Collections,
    Download,
    Favorite,
    Grid3x3,
    KeyboardDoubleArrowRight,
    Star,
    Visibility
} from "@mui/icons-material";
import {DownloadButton, DownloadPreview, ImageContainerWrapper, ImageName, ImageVariant, ImageWrapper} from "./styled";
import {formatBytes} from "../../../utills/size";
import {Gallery} from "react-grid-gallery";
import {simpleFormattedImages} from "../shared";
import {JustifySpaceBetween} from "../../../assets/shared/styles";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import AddToFavorite from "../../../components/modals/favorites/AddToFavorite";
import AddToCollection from "../../../components/modals/collections/AddToCollection";


const ShowImagePage = () => {

    const { user, isAuth } = useSelector(state => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [likeable, setLikeable] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [addToFavoriteOpen, setAddToFavoriteOpen] = useState(false);
    const [addToCollectionOpen, setAddToCollectionOpen] = useState(false);

    const [fetchingImage, isLoading, error] = useFetching(async () => {
        const { data: imageData } = await ImageService.show(id);
        const { data: likeableData } = await ImageService.likeable(id);
        const { data: viewsData } = await ImageService.view(id);

        if(viewsData.currentViewCount) {
            setImage({...imageData, views_count: viewsData.currentViewCount});
        } else {
            setImage(imageData);
        }

        setLikeable(likeableData);
        const variant = imageData.image_variants.length > 0 ? imageData.image_variants[0] : null;
        setSelectedVariant(variant);
    })


    useEffect(() => {
        fetchingImage();
    }, [id])


    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const handleClick = () => {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: 1
        })
    }

    const getImageVariantLabel = (variant) => {
        return `${variant.size.name} (${variant.width}x${variant.height}px) 
        (${formatBytes(variant.size_in_byte, 0)} | ${variant.extension})`;
    }

    const handleLikeableImageClick = (index, item) => {
        navigate(`/images/${item.id}`);
    }

    const handleLikeableImageSectionClick = (search) => {
        navigate(`/images?${search}`);
    }

    const renderLikeableSections = () => {
        const content = likeable.map((item, index) => {
            return (
                <Box key={index} sx={{ my: 3, px: 5}}>
                    <Divider sx={{ mb: 1}}/>
                    <JustifySpaceBetween>
                        <Typography variant='h6'>
                            {item.title}
                        </Typography>

                        <Button variant="outlined"
                                size="small"
                                endIcon={<KeyboardDoubleArrowRight/>}
                                onClick={() => handleLikeableImageSectionClick(item.search)}
                        >
                            Show More ({item.count})
                        </Button>

                    </JustifySpaceBetween>
                    <Divider  sx={{ mt: 1}}/>
                    <Gallery
                        images={simpleFormattedImages(item.images)}
                        onClick={handleLikeableImageClick}
                        enableImageSelection={true}
                    />

                </Box>
            )
        })


        return (
            <Box sx={{ my: 5}}>
                {content}
            </Box>
        )
    }

    const downloadPreview = () => {
        ImageService.downloadPreview(image.id);
    }

    const download = () => {
        if(!selectedVariant) {
            toast.error('please select image variant for download')
            return;
        }
        if(!isAuth) navigate(`/login`);
        if(!user.client.plan_id) {
            navigate(`/plans`);
        }
        ImageService.download(image.id, selectedVariant.id);
    }

    const addLike = async () => {
        const { data } = await ImageService.like(id);
        setImage({...image, likes_count: data.currentLikeCount});
    }

    const openFavoriteModal = () => {
        if(!isAuth) navigate(`/login`);
        setAddToFavoriteOpen(true)
    }

    const openCollectionModal = () => {
        if(!isAuth) navigate(`/login`);
        setAddToCollectionOpen(true)
    }

    return (
        <div>
            {isLoading && <CircularProgress />}
            { !isLoading && image &&
             <ImageContainerWrapper>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={7}
                              sx={{ px: 2,
                                  minHeight: '500px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                              }}
                        >
                            <Box>
                                <ImageName text={image.name}>
                                    {image.name}
                                </ImageName>

                                <ImageWrapper>
                                    <img
                                        style={{ maxWidth: '100%' }}
                                        src={getPreview(image.preview)}
                                        onClick={handleClick}
                                    />
                                </ImageWrapper>
                            </Box>


                            <Box sx={{ }}>
                                <Box sx={{ my: 1}}>
                                    Description
                                </Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    lexWrap='wrap'
                                    justifyContent='left'
                                    flexWrap='wrap'
                                >
                                        {image.tags.map(tag =>
                                            <Chip
                                                label={tag.name}
                                                variant="outlined"
                                                key={tag.id}
                                            />
                                        )}
                                    <Chip
                                        label={`ID: ${image.id}`}
                                        icon={<Grid3x3/>}
                                    />
                                    <Chip
                                        label={`Orientation: ${image.image_orientation.name}`}
                                        variant="contained"
                                    />
                                    { image.isEditorsChoice === true &&
                                        <Chip
                                            color='secondary'
                                            label={`Editor Choice`}
                                            variant="contained"
                                        />
                                    }
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={5} sx={{ px: 2}}>
                            <Stack direction="row"
                                   justifyContent='center'
                                   flexWrap={'wrap'}>
                                <Chip
                                    sx={{ cursor: 'pointer', m: 1 }}
                                    onClick={() => {}}
                                    avatar={
                                        <Avatar
                                            alt="Natacha"
                                            src={getAvatar(image.creator.user)}
                                        />}
                                    label={`Creator: ${image.creator.user.full_name}`}
                                    variant="outlined"
                                />
                                {
                                    image.photo_model &&
                                    <Chip
                                        sx={{ cursor: 'pointer', m: 1 }}
                                        onClick={() => { navigate(`/images?photo_model_id=${image.photo_model.id}`)}}
                                        avatar={
                                            <Avatar
                                                alt="Natacha"
                                                src={getAvatar(image.photo_model)}
                                            />}
                                        label={`Model: ${image.photo_model.full_name}`}
                                        variant="outlined"
                                    />
                                }
                            </Stack>
                            {
                                image.collection &&
                                <Stack direction="row"
                                       spacing={2}
                                       justifyContent='center'
                                       flexWrap={'wrap'}>
                                    <Chip
                                        sx={{ cursor: 'pointer', m: 1 }}
                                        label={`Collection: ${image.collection.name}`}
                                        icon={<Collections />}
                                        onClick={() => { navigate(`/images?collectionId=${image.collection.id}`)}}
                                        variant="outlined"
                                    />
                                </Stack>
                            }

                            <Stack direction="row"
                                   justifyContent='center'
                                   sx={{ my: 2 }}
                                   spacing={1}
                                   flexWrap={'wrap'}>
                                <Chip icon={<Visibility />}
                                      label={`Views: ${image.views_count}`}
                                      color="primary"
                                      variant="outlined" />
                                <Chip icon={<Download />}
                                      label={`Downloads: ${image.downloads_count}`}
                                      color="success"
                                      variant="outlined" />

                                <Chip icon={<Favorite />}
                                      label={`Likes: ${image.likes_count}`}
                                      color="success"
                                      variant="outlined"
                                      onClick={addLike}
                                      sx={{ ":hover": { color: 'red' } }}
                                />
                            </Stack>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                m: 3
                            }}>
                                <FormControl sx={{
                                    textAlign: 'left',
                                    width: '100%'
                                }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Image Variants
                                    </FormLabel>
                                    <RadioGroup
                                        column
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={selectedVariant ? selectedVariant.id : null}
                                        onChange={(e) =>
                                            setSelectedVariant(e.target.value)}
                                        sx={{ alignItems: 'flex-start' }}
                                    >
                                        {
                                            image.image_variants.map((variant) =>
                                                <ImageVariant
                                                    key={variant.id}
                                                    onClick={() => setSelectedVariant(variant)}>
                                                    <FormControlLabel
                                                        sx={{ px: 1}}
                                                        value={variant.id}
                                                        control={<Radio />}
                                                        label={getImageVariantLabel(variant)}
                                                    />
                                                </ImageVariant>
                                            )
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <DownloadPreview
                                        sx={{ width: '100%'}}
                                        variant="contained"
                                        startIcon={<Download />}
                                        onClick={downloadPreview}
                                    >
                                        Download Preview
                                    </DownloadPreview>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    { isAuth && user.creator && user.creator.id === image.creator.id ?
                                        <Button fullWidth
                                                variant="outlined"
                                                endIcon={<Star />}
                                                onClick={openFavoriteModal}
                                        >
                                            Add To My Collection
                                        </Button> :
                                        <Button fullWidth
                                            variant="outlined"
                                            endIcon={<Star />}
                                            onClick={openFavoriteModal}
                                        >
                                            Add To Favorite
                                        </Button>
                                    }
                                </Grid>
                            </Grid>

                            <Box sx={{ my: 2}}>
                                <DownloadButton
                                    sx={{ width: '100%'}}
                                    variant="contained"
                                    startIcon={<Download />}
                                    onClick={download}>
                                        Download
                                </DownloadButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <FsLightbox
                        toggler={lightboxController.toggler}
                        sources={[ getPreview(image.preview) ]}
                        slide={lightboxController.slide}
                        types={['image']}
                    />
             </ImageContainerWrapper>
            }

            { likeable &&
                renderLikeableSections()
            }

            { image && user && user.client &&
                <AddToFavorite
                    isOpen={addToCollectionOpen}
                    onClose={() => setAddToCollectionOpen(false)}
                    image={image}
                />
            }

            { image && user && user.creator && user.creator.id === image.creator.id &&
                <AddToCollection
                    isOpen={addToFavoriteOpen}
                    onClose={() => setAddToFavoriteOpen(false)}
                    image={image}
                />
            }

        </div>
    );
};

export default ShowImagePage;