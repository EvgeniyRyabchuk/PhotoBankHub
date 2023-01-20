import React, {useEffect, useRef, useState} from 'react';
import ModalWithTransition from "../ModalWithTransition";
import * as Yup from "yup";
import {
    Button,
    Grid,
    TextField,
    styled,
    alpha,
    Box,
    IconButton,
    Card,
    MenuItem,
    Select,
    InputLabel, FormControl, Autocomplete
} from "@mui/material";
import {Formik} from 'formik';
import {useSelector} from "react-redux";
import {PhotoCamera} from "@mui/icons-material";
import PhotoModelService from "../../../services/PhotoModelService";
import {calculateAspectRatioFit} from "../../../utills/utils";
import {ImageWrapper} from "../../../assets/shared/styles";


// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: 100,
    height: 100,
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.secondary[200]
            : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    border: "2px solid",
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.palette.background.paper,
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.secondary[400]
            : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
}));

const CustomCard = styled(Card)(() => ({
    padding: '1.5 rem',
    boxShadow: '2',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: '30px',

    "&: hover": {
        backgroundColor: 'lightgrey',
        cursor: 'pointer'
    }
}));

const validationSchema = Yup.object().shape({
    full_name: Yup.string().min(2, 'Name must contains at least 2 symbol').required('Full Name is required!'),
    age: Yup.number().min(3, 'Photo Model must be at least 3 year old').required('Age is required!'),
    gender: Yup.string().required('Gender is required!'),
    ethnicity: Yup.string().required('Ethnicity is required!'),
    avatar: Yup.string().optional(),
});

const CreatePhotoModel = ({ isOpen, onClose, onCreated}) => {
    const defInitialValues = {
        full_name: '',
        age: null,
        gender_id: null,
        ethnicity_id: null,
        avatar: '',
    };

    const { user } = useSelector(state => state.user);

    const [genders, setGenders] = useState([]);
    const [ethnicities, setEthnicities] = useState([]);

    const fetchGenders = async () => {
        const { data } = await PhotoModelService.getGenders();
        setGenders(data);

    }
    const fetchEthnicities = async () => {
        const { data } = await PhotoModelService.getEthnicities();
        setEthnicities(data);
    }




    const maxBoxW = 300, maxBoxH = 300;
    const [fileDimensions, setFileDimensions] = useState({ width: '0px', height: '0px'});
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const handleNewFileUpload = (e) => {
        const { files } = e.target;
        setFile(files[0])
        setFileUrl(URL.createObjectURL(files[0]));
    };

    const imgOnLoad = (e) => {
        const naturalW = e.target.naturalWidth;
        const naturalH = e.target.naturalHeight;
        setFileDimensions(calculateAspectRatioFit(naturalW, naturalH, maxBoxW, maxBoxH));
    }

    useEffect(() => {
        fetchGenders();
        fetchEthnicities();
    }, []);

    const submit = async (values) => {
        console.log(values);
        const { data } = await PhotoModelService.createPhotoModel({ ...values, avatar: file })
        onCreated(data);
        onClose();
    }

    const inputRef = useRef();

    return (
        <ModalWithTransition
            title='Create Photo Model'
            isOpen={isOpen}
            type='five'
            onClose={onClose}
        >
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
                    <form style={{
                        maxWidth: '400px',
                        maxHeight: '600px',
                        overflowY: 'auto',
                    }}
                          id="inner-form"
                          onSubmit={handleSubmit}>
                        {
                            fileUrl ?
                            <ImageWrapper>
                                <img
                                    width={fileDimensions.width}
                                    height={fileDimensions.height}
                                    src={fileUrl}
                                    onLoad={imgOnLoad}
                                />
                            </ImageWrapper> :
                                <CustomCard onClick={() => {
                                    console.log('click')
                                    inputRef.current.click();
                                }}>

                                    <ButtonWrapper>
                                        <UploadButton>
                                            <label ref={inputRef} htmlFor="upload-btn">
                                                <input
                                                    accept="image/*"
                                                    id="upload-btn"
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={handleNewFileUpload}
                                                />
                                                <IconButton
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    component="span">
                                                    <PhotoCamera sx={{ fontSize: 26, color: "gray" }} />
                                                </IconButton>
                                            </label>
                                        </UploadButton>
                                    </ButtonWrapper>
                                </CustomCard>
                        }


                        <Grid container spacing={3}>
                            {/* Full Name */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="input"
                                    name="full_name"
                                    label="Full Name"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    value={values.full_name}
                                    onChange={handleChange}
                                    helperText={touched.full_name && errors.full_name}
                                    error={Boolean(errors.full_name && touched.full_name)}
                                />
                            </Grid>

                            {/* Age */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-number"
                                    label="Age"
                                    type="number"
                                    size='small'
                                    InputLabelProps={{shrink: true,}}
                                    name='age'
                                    value={values.age}
                                    onChange={handleChange}
                                    helperText={touched.age && errors.age}
                                    error={Boolean(errors.age && touched.age)}
                                />
                            </Grid>

                            {/* Gender */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Autocomplete
                                    // fullWidth
                                    disablePortal
                                    options={genders}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Gender" />
                                    }
                                    name='gender'
                                    onChange={ (event, value) => {
                                        if(values) {
                                            console.log(value)
                                            setFieldValue("gender", value);
                                        }
                                    }}
                                    helperText={touched.gender && errors.gender}
                                    error={Boolean(errors.gender && touched.gender)}
                                />
                            </Grid>

                            {/* Ethnicity */}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Autocomplete
                                    // fullWidth
                                    disablePortal
                                    options={ethnicities}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Ethnicity" />
                                    }
                                    name='ethnicity'
                                    onChange={ (event, value) => {
                                        if(values) {
                                            console.log(value)
                                            setFieldValue("ethnicity", value);
                                        }
                                    }}
                                    helperText={touched.ethnicity && errors.ethnicity}
                                    error={Boolean(errors.ethnicity && touched.ethnicity)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSubmit}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </ModalWithTransition>
    );
};

export default CreatePhotoModel;