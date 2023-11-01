import React, {useEffect, useMemo, useState} from 'react';
import {
    Alert,
    Autocomplete,
    Box,
    Button, Chip,
    CircularProgress, Divider,
    FormControl, FormControlLabel, FormLabel,
    Grid, Radio, RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {ErrorSpan, ImageWrapper, JustifyContent, JustifySpaceBetween, JustifyStart} from "../../../assets/shared/styles";
import {ImageName} from "../../images/show/styled";
import EmptyImage from '../../../assets/images/browser_not_supported.webp';
import * as Yup from "yup";
import {Formik} from 'formik';
import {CreativeGridContainer, LeftGridContainer, RightGridContainer, RightGridContent} from "../shared";
import {calculateAspectRatioFit} from "../../../utills/utils";
import {useSelector} from "react-redux";
import CategoryTree from "../../../components/CategoryTree";
import CollectionService from "../../../services/CollectionService";
import TagServiec from "../../../services/TagServiec";
import PhotoModelService from "../../../services/PhotoModelService";
import {getAvatar, getPreview} from "../../../utills/axios";
import CreatePhotoModel from "../../../components/modals/CreatePhotoModel";
import ImageService from "../../../services/ImageService";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";


const flexBoxCenterStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const LocalFileStatusList = {
    wait: 'wait',
    loading: 'loading',
    success: 'success',
    fail: 'fail'
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required!'),
    description: Yup.string().optional(),
    category_id: Yup.number().required('Category is required!'),
    collection_id: Yup.number().optional(),
    tags: Yup.string().optional(),
    people_count: Yup.number().optional(),
    isFree: Yup.boolean(),
    photo_model_id: Yup.number().optional().nullable(),
});

const UnsupportedImage = ({ width, height}) => (
    <img
        style={{ maxWidth: '100%' }}
        width={width}
        height={height}
        src={EmptyImage}
    />
);

const EditImage = () => {
    const [image, setImage] = useState(null);
    const { id } = useParams();

    const [fetchingImage, isLoading, error] = useFetching(async () => {
        const {data} = await ImageService.show(id);
        setImage(data);

        const fetchCollections = async () => {
            const { data } = await CollectionService.getCollections(`?creatorId=${user.creator.id}`);
            setCollections(data);
        }
        const fetchTags = async () => {
            const { data } = await TagServiec.getAll();
            setExistTags(data);
        }
        const fetchPhotoModels = async () => {
            const { data } = await PhotoModelService.getAll('?paginate=false');
            setExistPhotoModels(data);
        }
        fetchTags();
        fetchCollections();
        fetchPhotoModels();
    })
    const { categories } = useSelector(state => state.general);

    const [fileDimensions, setFileDimensions] = useState({ width: '0px', height: '0px'});
    const maxBoxW = 576, maxBoxH = 600;

    const [existTags, setExistTags] = useState([]);
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const updateUploadedFiles = (files) => {
        try {

        } catch (ex) {

        }
    }

    const imgOnLoad = (e) => {
        const naturalW = e.target.naturalWidth;
        const naturalH = e.target.naturalHeight;
        setFileDimensions(calculateAspectRatioFit(naturalW, naturalH, maxBoxW, maxBoxH));
    }

    const [collections, setCollections] = useState([]);

    const [existPhotoModels, setExistPhotoModels] = useState([]);

    const [createPhotoModelModalOpen, setCreatePhotoModelModalOpen] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const selectedCategory = useMemo(() => {
        if(selectedCategoryId)
            return categories.find(c => c.id == selectedCategoryId);
        else if(image)
            return categories.find(c => c.id == image.category_id);
        else return null;
    }, [selectedCategoryId, image])


    useEffect(() => {
        fetchingImage();
    }, []);

    const submit = async (values) => {
        console.log(values)
        const result = await ImageService.updateImage({...values, tags: values.tags.split(',')}, image.id);
        navigate(`/images/${image.id}`);
    }


    return (
        <Box sx={{ my: 2}}>
            { isLoading && <CircularProgress /> }
            { image &&
                <Formik
                    onSubmit={submit}
                    initialValues={{
                        name: image.name,
                        description: image.description,
                        category_id: image.category_id,
                        collection_id: image.collection_id,
                        isFree: image.isFree,
                        people_count: image.people_count,
                        tags: image.tags.map(t => t.name).join(',')
                    }}
                    validationSchema={validationSchema}
                >
                    {({ values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue
                      }) => (

                        <form id="inner-form" onSubmit={handleSubmit}>
                            <CreativeGridContainer container spacing={3}>
                                <LeftGridContainer sx={{ p: 0}} item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <Box sx={{ m: 0}}>
                                        <ImageName text={ image.name }>
                                            { image.name }
                                        </ImageName>

                                        <ImageWrapper maxHeight={'600px'}>
                                            {/*<UnsupportedImage width={maxBoxW} height={maxBoxH}/> :*/}
                                            <img
                                                style={{ maxWidth: '100%' }}
                                                width={fileDimensions.width ?? '0px'}
                                                height={fileDimensions.height ?? '0px'}
                                                src={ getPreview(image.preview)}
                                                onLoad={imgOnLoad}
                                            />
                                        </ImageWrapper>
                                    </Box>
                                </LeftGridContainer>
                                <RightGridContainer item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
                                    >
                                        <Typography variant='h4'>
                                            Upload Image Info
                                        </Typography>
                                        <RightGridContent container spacing={2}>

                                            {/* Name */}
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    type="input"
                                                    name="name"
                                                    label="Name"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    helperText={touched.name && errors.name}
                                                    error={Boolean(errors.name && touched.name)}
                                                />
                                            </Grid>

                                            {/* Description */}
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-multiline-flexible"
                                                    multiline
                                                    label="Description (optional)"
                                                    variant="outlined"
                                                    name='description'
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    helperText={touched.description && errors.description}
                                                    error={Boolean(errors.description && touched.description)}
                                                />
                                            </Grid>

                                            {values.name}
                                            <br />
                                            {values.description}
                                            <br />
                                            {values.category_id}
                                            <br />
                                            {values.collection_id}
                                            <br />
                                            {/*{values.tags}*/}
                                            <br />
                                            {values.people_count}
                                            <br />
                                            {values.isFree}


                                            {/* Category */}
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Divider />
                                                <CategoryTree
                                                    defVal={image.category_id}
                                                    title={'Select Category'}
                                                    data={categories}
                                                    onSelect={(categoryId) => {
                                                        setFieldValue('category_id', categoryId);
                                                        setSelectedCategoryId(categoryId);
                                                    }}
                                                />
                                                { selectedCategory &&
                                                    <Typography color={'secondary'} variant='span'>
                                                        Your selected category: {selectedCategory.name}
                                                    </Typography>
                                                }


                                                { touched.category_id && errors.category_id &&
                                                    <ErrorSpan>
                                                        Please Select Category For Image
                                                    </ErrorSpan>
                                                }
                                                <Divider />
                                            </Grid>

                                            {/* Collection */}
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                {collections.length > 0 &&
                                                    <Autocomplete
                                                        // defaultValue={}
                                                        size="small"
                                                        getOptionLabel={(option) => option.name}
                                                        disablePortal
                                                        id="combo-box-collections"
                                                        options={collections}
                                                        sx={{ mx: 1 }}
                                                        defaultValue={image.collection_id &&
                                                            collections.find(c => c.id == image.collection_id)
                                                        }
                                                        // value={image.collection_id &&
                                                        //     collections.find(c => c.id == image.collection_id)}

                                                        renderInput={(params) =>
                                                            <TextField
                                                                {...params}
                                                                error={Boolean(touched.collection_id && errors.collection_id)}
                                                                fullWidth
                                                                helperText={touched.collection_id && errors.collection_id}
                                                                label="Collection"
                                                                name="collection_id"
                                                                variant="outlined"
                                                            />
                                                        }
                                                        renderOption={(props, option) => (
                                                            <Box component="li"
                                                                 sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                                 {...props}>
                                                                {option.name} ({option.images_count})
                                                            </Box>
                                                        )}
                                                        onChange={ (event, values) => {
                                                            if(values) {
                                                                setFieldValue("collection_id", values.id);
                                                            }
                                                        }}
                                                    />
                                                }
                                            </Grid>

                                            {/* Policy */}
                                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                <FormControl>
                                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                                        Policy
                                                    </FormLabel>

                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        // value={Boolean(values.isFree)}
                                                        defaultValue={values.isFree ? true: false}
                                                        onChange={(e) =>
                                                            setFieldValue('isFree', e.target.value)
                                                        } >
                                                        <FormControlLabel
                                                            // checked={values.isFree == true}
                                                            value={true}
                                                            // checked={values.isFree == true}
                                                            control={<Radio />}
                                                            label='Free'
                                                        />
                                                        <FormControlLabel
                                                            value={false}
                                                            // checked={values.isFree == false}
                                                            // checked={values.isFree == false}
                                                            control={<Radio />}
                                                            label='Paid'
                                                        />

                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>

                                            {/* People Count */}
                                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}
                                                  style={flexBoxCenterStyle}
                                            >
                                                <TextField
                                                    id="outlined-number"
                                                    label="People Count"
                                                    type="number"
                                                    size='small'
                                                    InputLabelProps={{shrink: true,}}
                                                    name='people_count'
                                                    value={values.people_count}
                                                    onChange={handleChange}
                                                    helperText={touched.people_count && errors.people_count}
                                                    error={Boolean(errors.people_count && touched.people_count)}
                                                />
                                            </Grid>

                                            {/* Tags */}
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Autocomplete
                                                    multiple
                                                    id="tags-outlined"
                                                    options={existTags.length > 0 && existTags.map(tag => tag.name)}
                                                    // defaultValue={}
                                                    freeSolo
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip
                                                                variant="outlined"
                                                                label={option}
                                                                {...getTagProps({ index })}
                                                            />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label="Image Tags"
                                                            placeholder="Favorites"
                                                        />)}
                                                    onChange={(event, value, reason, details) => {
                                                        console.log(123 )
                                                        if(value) setFieldValue('tags', value.join(','))
                                                    }}
                                                    defaultValue={image.tags.map(t => t.name)}
                                                />
                                            </Grid>

                                            {/* Photo Model */}
                                            {/*
                                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Autocomplete
                                                        sx={{ mr: 1, flex: '2 0 0' }}
                                                        // defaultValue={}
                                                        size='medium'
                                                        getOptionLabel={(option) => option.full_name}
                                                        disablePortal
                                                        id="combo-box-photo-models"
                                                        options={existPhotoModels}
                                                        renderInput={(params) =>
                                                            <JustifyContent>
                                                                <TextField
                                                                    {...params}
                                                                    error={Boolean(touched.photo_model_id && errors.photo_model_id)}
                                                                    fullWidth
                                                                    helperText={touched.photo_model_id && errors.photo_model_id}
                                                                    label="Photo Model"
                                                                    name="photo_model_id"
                                                                    variant="outlined"
                                                                />

                                                            </JustifyContent>

                                                        }
                                                        renderOption={(props, option) => (
                                                            <Box {...props} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}>
                                                                <JustifySpaceBetween sx={{ width: '100%'}}>
                                                                    <Box>
                                                                        {option.full_name} ({option.id})
                                                                    </Box>
                                                                    <Box>
                                                                        <img src={getAvatar(option)} width='50' height='50' />
                                                                    </Box>
                                                                </JustifySpaceBetween>

                                                            </Box>
                                                        )}
                                                        onChange={ (event, values) => {
                                                            if(values) {
                                                                setFieldValue("photo_model_id", values.id);
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        sx={{ flex: '1 0 0', ml: 1, maxHeight: '50px' }}
                                                        type='button'
                                                        variant='contained'
                                                        color='primary'
                                                        onClick={() => setCreatePhotoModelModalOpen(true)}>
                                                        Create New
                                                    </Button>
                                                </Box>
                                                <CreatePhotoModel
                                                    isOpen={createPhotoModelModalOpen}
                                                    onClose={() => setCreatePhotoModelModalOpen(false)}
                                                    onCreated={(newPhotoModel) =>
                                                        setExistPhotoModels([newPhotoModel, ...existPhotoModels])}
                                                />
                                            </Grid>
                                            */}


                                        </RightGridContent>

                                        <Button type='submit' fullWidth variant='contained' color='primary'>
                                            Update
                                        </Button>
                                    </Box>

                                </RightGridContainer>
                            </CreativeGridContainer>
                        </form>
                    )}
                </Formik>
            }

        </Box>
    );
};

export default EditImage;


