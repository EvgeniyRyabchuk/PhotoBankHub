import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import * as Yup from "yup";
import {AlertTitle, alpha, Avatar, Box, Button, Grid, IconButton, styled, TextField} from "@mui/material";
import {Formik} from "formik";
import UserService from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {getAvatar} from "../../utills/axios";
import {PhotoCamera} from "@mui/icons-material";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import ImageCropper from "../ImageCropper";
import {JustifyContent} from "../../assets/shared/styles";
import {useAction} from "../../hooks/useAction";
import {toast} from "react-toastify";
import AuthService from "../../services/AuthService";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: 300,
    marginTop: '10px',
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
    display: "flex",
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


const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
    email: Yup.string().email().required("Email is Required!"),
    full_name: Yup.string().required('Full Name required'),
    website: Yup.string().optional(),
    about: Yup.string().optional()
});

const ProfileSetting = () => {

    const { user, isAuth} = useSelector(state => state.user);
    const [cropOpen, setCropOpen] = useState(false);
    const [imageFile, _setImageFile] = useState(null);
    const [imageUrl, _setImageUrl] = useState(getAvatar(user));

    const { profile } = useAction();
    const navigate = useNavigate();

    const [isCodeInputShow, setIsCodeInputShow] = useState(false);
    const [isPasswordResetSentAlertShow, setIsPasswordResetSentAlertShow] = useState(false);

    const [token, setToken] = useState('');

    const sendVerifyEmail = async () => {
        const data = await AuthService.sendEmailVerification();
        setIsCodeInputShow(true);
    }

    const emailVerify = async () => {
        const data = await AuthService.emailVerify(token);
        setIsCodeInputShow(false);
        profile();
    }

    const sendChangePasswordRequest = async () => {
        const data = await AuthService.sendPasswordReset(user.email);
        setIsPasswordResetSentAlertShow(true);
    }

    const handleFormSubmit = async (values) => {
        const { data } = await UserService.update(user.id, values);
        await profile();
        toast.success('Profile is updated');
    };

    const defInitialValues = useMemo(() => {
        return {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            about: user.about,
            website: user.website,
        }
    }, [user]);

    const avatarChangeHandler = async (file, fileUrl) => {
        setCropOpen(false);
        _setImageFile(file);
        const { data } = await UserService.update(user.id, { ...defInitialValues, avatar: file });
        console.log('change', data);
        _setImageUrl(`${API_URL_WITH_PUBLIC_STORAGE}/${data.avatar}`);
        profile();
        toast.success('Avatar is updated');
    }

    return (
        <Box>
            Setting

            <JustifyContent>
                <ButtonWrapper>
                    <UploadButton>
                        <label htmlFor="upload-btn">
                            <Avatar sx={{ width: '100px', height: '100px', mx: 'auto'}}
                                    src={imageUrl} />
                            {/*<input*/}
                            {/*    accept="image/*"*/}
                            {/*    id="upload-btn"*/}
                            {/*    type="file"*/}
                            {/*    style={{ display: "none" }}*/}
                            {/*/>*/}
                            <Box>
                                <IconButton
                                    onClick={() => setCropOpen(true)} h
                                    component="span"
                                    style={{ borderRadius: '0px'}}
                                >
                                    <PhotoCamera sx={{ fontSize: 26, color: "gray" }} />
                                    <Box>Upload New Avatar</Box>
                                </IconButton>

                            </Box>

                        </label>

                    </UploadButton>

                </ButtonWrapper>
                { cropOpen &&
                    <ImageCropper
                        onChange={(file, fileUrl) =>
                            avatarChangeHandler(file, fileUrl)
                        }
                        setOpen={setCropOpen}
                    />
                }
            </JustifyContent>

            <Box sx={{ width: '800px', mx: 'auto', my: 3, py: 2}}>
                { user.email_verified_at ?
                    <Alert severity="success">Your email verify successfully</Alert> :
                    <Alert severity="error">Your email verify is not verify yet</Alert>
                }

                <br/>

                {!user.email_verified_at &&
                    <Button variant='contained' onClick={sendVerifyEmail}>
                        Send Verify Email
                    </Button>
                }

                <br/>
                <br/>

                { isCodeInputShow &&
                    <JustifyContent>
                        <TextField
                            label='Email Verify Code'
                            placeholder='input code for email verufy'
                            type="text"
                            value={token}
                            onChange={(e) =>
                                setToken(e.target.value)
                            }
                        />
                        <Button variant='contained' onClick={emailVerify}>
                            Verify Email
                        </Button>
                    </JustifyContent>
                }


                <br/>


                {
                   !isPasswordResetSentAlertShow &&
                    <Button
                        variant='contained'
                        onClick={sendChangePasswordRequest}>
                        Change Password
                    </Button>
                }

                {
                    isPasswordResetSentAlertShow &&
                    <Alert severity="info">
                        <AlertTitle>Password Sent</AlertTitle>
                        Password Sent Successfully — <strong>check out your email!</strong>
                    </Alert>
                }


            </Box>

            <hr />

            <Formik
                onSubmit={handleFormSubmit}
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
                    <form style={{padding: '25px'}} id="inner-form" onSubmit={handleSubmit}>
                        <Box sx={{ width: '500px', margin: '20px auto'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
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
                                        helperText={touched.full_name && `${errors.full_name ?? ''}`}
                                        error={Boolean(errors.full_name && touched.full_name)}
                                        sx={{ mb: 3}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="input"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange}
                                        helperText={touched.email && `${errors.email ?? ''}`}
                                        error={Boolean(errors.email && touched.email)}
                                        sx={{ mb: 3}}
                                    />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextField
                                        sx={{width: '100%'}}
                                        id="standard-multiline-static"
                                        label="About"
                                        multiline
                                        rows={8}
                                        name='about'
                                        onBlur={handleBlur}
                                        value={values.about}
                                        onChange={handleChange}
                                        helperText={touched.about && `${errors.about ?? ''}`}
                                        error={Boolean(errors.about && touched.about)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="input"
                                        name="website"
                                        label="Website"
                                        variant="outlined"
                                        onBlur={handleBlur}
                                        value={values.website}
                                        onChange={handleChange}
                                        helperText={touched.website && `${errors.website ?? ''}`}
                                        error={Boolean(errors.website && touched.website)}
                                        sx={{ mb: 3}}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid container spacing={3} sx={{ pt: 5}}>
                            <Grid item xs={12}>

                            </Grid>
                        </Grid>

                        {
                            defInitialValues.email !== values.email ||
                            defInitialValues.full_name !== values.full_name ||
                            defInitialValues.website !== values.website ||
                            defInitialValues.about !== values.about ?
                                <Box sx={{p: 5}}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                    >
                                        Save
                                    </Button>
                                </Box>
                                : ''
                        }
                    </form>
                )}
            </Formik>




        </Box>
    );
};

export default ProfileSetting;