import React, {useState} from 'react';
import {Box, Button, Card, FormHelperText} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import AuthService from "../../../services/AuthService";
import {useSelector} from "react-redux";
import {useAction} from "../../../hooks/useAction";
import {FlexBox} from "../../../assets/shared/styles";
import {H1, Small} from "../../../assets/typography";
import LightTextField from "../../../components/UI/LightTextField";
import {LoadingButton} from "@mui/lab";
import * as Yup from "yup";
import {useFormik} from "formik";


const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('');
    const { logout } = useAction();
    const navigate = useNavigate();

    const { token, id } = useParams();

    const initialValues = {
        newPassword: "",
        submit: null,
    };

    // form field value validation schema
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(3)
            .max(255)
            .required("New Password is required"),
    });

    const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit: async (values) => {
                const data = await AuthService.passwordReset(id, token, values.newPassword);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
            },
        });


    return (
        <FlexBox
            height="80vh"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
                <FlexBox
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    mb={5}
                >
                    <Box width={38} mb={1}>
                        <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" />
                    </Box>
                    <H1 fontSize={24} fontWeight={700}>
                        Reset your password
                    </H1>
                </FlexBox>

                <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
                    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <LightTextField
                            fullWidth
                            name="newPassword"
                            type="password"
                            label="New Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.newPassword || ""}
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                        />

                        <Button fullWidth type="submit" variant="contained">
                            Reset
                        </Button>
                    </form>

                    <Small margin="auto" mt={3} color="text.disabled">
                        Don't have an account?{" "}
                        <Link to="/register">
                            <Small color="primary.main">Create an account</Small>
                        </Link>
                    </Small>
                </FlexBox>
            </Card>
        </FlexBox>
    );
};

export default PasswordReset;