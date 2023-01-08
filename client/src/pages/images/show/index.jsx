import React, {useEffect, useState} from 'react';
import ImageService from "../../../services/ImageService";
import {useFetching} from "../../../hooks/useFetching";
import {
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, ImageList, ImageListItem, ImageListItemBar,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {getAvatar, getPreview} from "../../../utills/axios";
import {useNavigate, useParams} from "react-router-dom";
import FsLightbox from "fslightbox-react";
import Stack from "@mui/material/Stack";
import {Download, Favorite, Grid3x3, Star, Visibility} from "@mui/icons-material";
import {DownloadButton, DownloadPreview, ImageContainerWrapper, ImageName, ImageVariant, ImageWrapper} from "./styled";
import {formatBytes} from "../../../utills/size";
import {Gallery} from "react-grid-gallery";
import {simpleFormattedImages} from "../shared";


const ShowImagePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [likeable, setLikeable] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);


    const [fetchingImage, isLoading, error] = useFetching(async () => {
        const { data: imageData } = await ImageService.show(id);
        const { data: likeableData } = await ImageService.likeable(id);
        setImage(imageData);
        setLikeable(likeableData);
        const variant = imageData.image_variants.length > 0 ? imageData.image_variants[0] : null;
        setSelectedVariant(variant);
    })


    useEffect(() => {
        fetchingImage();
    }, [])


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

    const handleLikeableImageClick = (image) => {
        navigate(`/images/${image.id}`)
    }

    const handleLikeableImageSeactionClick = (index, item) => {
        console.log('section click handler');
    }

    return (
        <div>
            {isLoading && <CircularProgress />}
            { !isLoading && image &&
             <ImageContainerWrapper>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8} xl={7} sx={{ p: 2}}>
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

                            <Box>
                                <Box sx={{ my: 1}}>
                                    Description
                                </Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    lexWrap='wrap'
                                    justifyContent='left'>
                                        {image.tags.map(tag =>
                                            <Chip
                                                label={tag.name}
                                                variant="outlined"
                                                key={tag.id}
                                            />
                                        )}
                                </Stack>

                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4} xl={5} sx={{ p: 2}}>
                            <Stack direction="row" spacing={1} flexWrap={'wrap'}>
                                <Chip
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {}}
                                    avatar={
                                        <Avatar alt="Natacha"
                                                src={getAvatar(image.creator.user)}
                                        />}
                                    label={`Creator: ${image.creator.user.full_name}`}
                                    variant="outlined"
                                />
                                <Chip
                                    label={`ID: ${image.id}`}
                                    icon={<Grid3x3/>}
                                />
                            </Stack>
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
                                      variant="outlined" />
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
                                                        key={variant.id}
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
                                    <DownloadPreview sx={{ width: '100%'}} variant="contained" startIcon={<Download />}>
                                        Download Preview
                                    </DownloadPreview>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={3} sm={3} md={12} lg={3} xl={3}>
                                            <Button fullWidth variant="outlined" endIcon={<Favorite />}>
                                                {image.likes_count}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={12} lg={9} xl={9}>
                                            <Button fullWidth variant="outlined" endIcon={<Star />}>
                                                Add To Favorite
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Box sx={{ my: 2}}>
                                <DownloadButton sx={{ width: '100%'}} variant="contained" startIcon={<Download />}>
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

            {
                likeable &&
                <Box sx={{ my: 5}}>

                    <Box sx={{ my: 3}}>
                        <Typography variant='h4'>
                            Same Image By Tags
                        </Typography>

                        {/*<ImageList variant="masonry" cols={3} gap={8}>*/}
                        {/*    {likeable.sameImageByTags.map((item) => (*/}
                        {/*        <ImageListItem key={item.id} >*/}
                        {/*            <img*/}
                        {/*                src={`${getPreview(item.preview)}`}*/}
                        {/*                srcSet={`${getPreview(item.preview)}`}*/}
                        {/*                alt={item.name}*/}
                        {/*                loading="lazy"*/}
                        {/*            />*/}
                        {/*            <ImageListItemBar position="below" title={item.name} />*/}
                        {/*        </ImageListItem>*/}
                        {/*    ))}*/}
                        {/*</ImageList>*/}

                        {/*<Grid container spacing={2} my={2} px={2}>*/}
                        {/*    {likeable.sameImageByTags.map((item) => (*/}
                        {/*        <Grid item md={3} xs={4} key={item.id}>*/}
                        {/*            <img*/}
                        {/*                src={getPreview(item.preview)}*/}
                        {/*                alt={item.name}*/}
                        {/*                onClick={handleLikeableImageClick(item)}*/}
                        {/*                width="100%"*/}
                        {/*                height="100%"*/}
                        {/*                style={{ cursor: "pointer" }}*/}
                        {/*            />*/}
                        {/*        </Grid>*/}
                        {/*    ))}*/}
                        {/*</Grid>*/}

                        <Gallery
                            images={simpleFormattedImages(likeable.sameImageByTags)}
                            onClick={handleLikeableImageClick}

                        />

                    </Box>

                </Box>
            }
        </div>
    );
};

export default ShowImagePage;