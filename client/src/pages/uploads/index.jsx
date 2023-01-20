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
import FileUploader from "../../components/FileUploader";
import {ErrorSpan, ImageWrapper, JustifyContent, JustifySpaceBetween, JustifyStart} from "../../assets/shared/styles";
import {ImageName} from "../images/show/styled";
import EmptyImage from '../../assets/images/browser_not_supported.webp';
import {Delete, Tag} from "@mui/icons-material";
import {Small} from "../../assets/typography";
import * as Yup from "yup";
import {Formik} from 'formik';
import {CreativeGridContainer, LeftGridContainer, RightGridContainer, RightGridContent} from "./styled";
import {calculateAspectRatioFit} from "../../utills/utils";
import {useSelector} from "react-redux";
import CategoryTree from "../../components/CategoryTree";
import CollectionService from "../../services/CollectionService";
import TagServiec from "../../services/TagServiec";
import PhotoModelService from "../../services/PhotoModelService";
import {getAvatar} from "../../utills/axios";
import CreatePhotoModel from "../../components/modals/CreatePhotoModel";
import ImageService from "../../services/ImageService";
import {useNavigate} from "react-router-dom";

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
    // tags: Yup.string().optional(),
    // people_count: Yup.number().optional(),
    is_free: Yup.boolean(),
    // photo_model_id: Yup.boolean().optional(),
});

const UnsupportedImage = ({ width, height}) => (
    <img
        style={{ maxWidth: '100%' }}
        width={width}
        height={height}
        src={EmptyImage}
    />
);

const Uploads = () => {
    const defInitialValues = {
            name: '',
            description: '',
            category_id: null,
            collection_id: null,
            tags: '',
            people_count: null,
            is_free: false,
            photo_model_id: null,
    };
    const { categories } = useSelector(state => state.general);
    const [localFileLoadStatus, setLocalFileLoadStatus] = useState(LocalFileStatusList.wait);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileDimensions, setFileDimensions] = useState({ width: '0px', height: '0px'});
    const maxBoxW = 576, maxBoxH = 600;
    const ImageFormat = {
        tiff: 'image/tiff',
        jpeg: 'image/jpeg',
        png: 'image/png',
        raw: 'image/raw',
    }
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const updateUploadedFiles = (files) => {
        try {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setFile(file);
            setFileUrl(url);
            if(formatSupport(file)) {
                setLocalFileLoadStatus(LocalFileStatusList.loading);
            } else {
                setLocalFileLoadStatus(LocalFileStatusList.success);
            }
        } catch (ex) {
            setLocalFileLoadStatus(LocalFileStatusList.fail)
        }
    }

    const imgOnLoad = (e) => {
        const naturalW = e.target.naturalWidth;
        const naturalH = e.target.naturalHeight;
        setFileDimensions(calculateAspectRatioFit(naturalW, naturalH, maxBoxW, maxBoxH));
        setLocalFileLoadStatus(LocalFileStatusList.success)
    }

    const formatSupport = (file) => {
        if(file.type == ImageFormat.tiff) return false;
        else return true;
    }

    const undo = () => {
        setFile(null)
        setFileUrl(null);
        setLocalFileLoadStatus(LocalFileStatusList.wait);
    }

    const submit = async (values) => {
        console.log(values);
        try {
            const result = await ImageService.createImage({ ...values, image: file});
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }

    }

    const [collections, setCollections] = useState([]);
    const [existTags, setExistTags] = useState([]);
    const [existPhotoModels, setExistPhotoModels] = useState([]);

    const [createPhotoModelModalOpen, setCreatePhotoModelModalOpen] = useState(false);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const selectedCategory = useMemo(() => {
        if(!selectedCategoryId) return null;

        return categories.find(c => c.id == selectedCategoryId);
    }, [selectedCategoryId])

    useEffect(() => {
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
        fetchCollections();
        fetchTags();
        fetchPhotoModels();
    }, []);


    return (
        <Box sx={{ my: 2}}>
            <Formik
                onSubmit={submit}
                initialValues={defInitialValues}
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
                                {
                                    localFileLoadStatus === LocalFileStatusList.loading &&
                                    <CircularProgress />
                                }

                                    { file ?
                                        <Box sx={{ m: 0}}>
                                            <ImageName text={file.name}>
                                                {file.name}
                                            </ImageName>

                                            <ImageWrapper maxHeight={'600px'}>
                                                {!formatSupport(file) ?
                                                    <UnsupportedImage width={maxBoxW} height={maxBoxH}/> :
                                                    <img
                                                        style={{ maxWidth: '100%' }}
                                                        width={fileDimensions.width ?? '0px'}
                                                        height={fileDimensions.height ?? '0px'}
                                                        src={fileUrl}
                                                        onLoad={imgOnLoad}
                                                    />
                                                }
                                            </ImageWrapper>
                                            <Box>
                                                { localFileLoadStatus === LocalFileStatusList.success &&
                                                    <Alert severity="success">
                                                        Image Loaded Success
                                                    </Alert>
                                                }
                                                { localFileLoadStatus === LocalFileStatusList.fail &&
                                                    <Alert severity="error">
                                                        Image Not Loaded
                                                    </Alert>
                                                }
                                                {!formatSupport(file) &&
                                                    <Alert severity="info">
                                                        Browser not supported preview for this format of image
                                                    </Alert>
                                                }
                                                <Button
                                                    sx={{ my: 2 }}
                                                    onClick={undo}
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<Delete />}
                                                >
                                                    Delete/Reset
                                                </Button>
                                            </Box>
                                        </Box>
                                        :
                                        <FileUploader
                                            accept="*"
                                            // label="Profile Image(s)"
                                            // multiple
                                            updateFilesCb={updateUploadedFiles}
                                            containerPadding='100px 20px'
                                        />
                                    }

                                    <JustifyContent>
                                        <Small
                                            maxWidth={200}
                                            lineHeight={1.9}
                                            display="block"
                                            textAlign="center"
                                            color="text.disabled"
                                        >
                                            Allowed *.jpeg, *.jpg, *.png, *.gif or *.tiff,
                                            *.row but without preview on this page
                                            <br/> max size of 100 MB
                                        </Small>
                                    </JustifyContent>

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

                                        {/* Category */}
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Divider />
                                            <CategoryTree
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
                                            <Autocomplete
                                                // defaultValue={}
                                                size="small"
                                                getOptionLabel={(option) => option.name}
                                                disablePortal
                                                id="combo-box-collections"
                                                options={collections}
                                                sx={{ mx: 1 }}
                                                
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
                                                    value={values.is_free}
                                                    onChange={(e) =>
                                                        setFieldValue('is_free', e.target.value)
                                                    } >
                                                        <FormControlLabel
                                                            value={true}
                                                            // checked={level === value}
                                                            control={<Radio />}
                                                            label={'Free'}
                                                        />
                                                        <FormControlLabel
                                                            value={false}
                                                            // checked={level === value}
                                                            control={<Radio />}
                                                            label={'Paid'}
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
                                                options={existTags.map(tag => tag.name) ?? []}
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
                                                    if(value) setFieldValue('tags', value.join(','))
                                                }}
                                            />
                                        </Grid>

                                        {/* Photo Model */}
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
                                                    sx={{ flex: '1 0 0', ml: 1 }}
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

                                    </RightGridContent>

                                    <Button type='submit' fullWidth variant='contained' color='primary'>
                                        Publish
                                    </Button>
                                </Box>

                            </RightGridContainer>
                        </CreativeGridContainer>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Uploads;




/*

             categoriesId.map(parentCategory =>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Autocomplete
                                                        // defaultValue={}
                                                        size="small"
                                                        getOptionLabel={(option) => option.name}
                                                        disablePortal
                                                        id="combo-box-categories"
                                                        options={siblings}
                                                        sx={{ mx: 1 }}

                                                        renderInput={(params) =>
                                                                <TextField
                                                                    {...params}
                                                                    error={Boolean(touched.category_id && errors.category_id)}
                                                                    fullWidth
                                                                    helperText={touched.category_id && errors.category_id}
                                                                    label="Categories"
                                                                    name="category_id"
                                                                    variant="outlined"
                                                                />
                                                        }
                                                        renderOption={(props, option) => (
                                                            <Box component="li"
                                                                 sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                                 {...props}>
                                                                {option.name} ({option.id})
                                                            </Box>
                                                        )}
                                                        onChange={(event, values) =>
                                                            onCategoryChange(values, setFieldValue)
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        }

 */