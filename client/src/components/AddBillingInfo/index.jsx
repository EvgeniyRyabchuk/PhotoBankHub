import React, {useEffect, useState} from 'react';
import {alpha, Box, Button, Card, Grid, styled,} from "@mui/material";
import * as Yup from "yup";
import {useFormik} from "formik";
import LightTextField from "../UI/LightTextField";
import {useSelector} from "react-redux";
import BillingInfoService from "../../services/BillingInfoService";
import {toast} from "react-toastify";


const AddBillingInfo = ({ onSave }) => {

    const { user } = useSelector(state => state.user);

    const initialValues = {
        full_name: "",
        email: "",
        phone_number: "",
        country: "",
        companyName: "",
        city: "",
        street: "",
        zipCode: "",
    };

    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required("Name is Required!"),
        email: Yup.string().email().required("Email is Required!"),
        phone_number: Yup.number().min(8).required("Phone is Required!"),
        country: Yup.string().required("Country is Required!"),
        companyName: Yup.string().required("State is Required!"),
        city: Yup.string().required("City is Required!"),
        street: Yup.string().required("Address is Required!"),
        zipCode: Yup.string().required("Zip is Required!"),
    });

    const { values, errors, handleChange, handleSubmit, touched, setValues } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if(values.id) {
                const { data } = await BillingInfoService.updateBillingInfo(values, values.id);
                onSave(data);
            } else {
                const { data } = await BillingInfoService.addBillingInfo(values);
                onSave(data);
            }
            toast.success('Billing Info Saved');
        },
    });

    useEffect(() => {
        const fetchBillignInfo = async () => {
            const { data } = await BillingInfoService.getBillingInfo();
            if(data) {
                setValues(data);
                onSave(data);
            }
        }
        fetchBillignInfo();
    }, []);

    return (
        <Card sx={{ padding: 3, boxShadow: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="full_name"
                            placeholder="Full Name"
                            value={values.full_name}
                            onChange={handleChange}
                            error={Boolean(touched.full_name && errors.full_name)}
                            helperText={touched.full_name && errors.full_name}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="email"
                            placeholder="Email Address"
                            value={values.email}
                            onChange={handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="phone_number"
                            placeholder="Phone Number"
                            value={values.phone_number}
                            onChange={handleChange}
                            error={Boolean(touched.phone_number && errors.phone_number)}
                            helperText={touched.phone_number && errors.phone_number}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="country"
                            placeholder="Country"
                            value={values.country}
                            onChange={handleChange}
                            error={Boolean(touched.country && errors.country)}
                            helperText={touched.country && errors.country}
                        />
                    </Grid>

                    {/*<Grid item sm={6} xs={12}>*/}
                    {/*    <LightTextField*/}
                    {/*        fullWidth*/}
                    {/*        name="state"*/}
                    {/*        placeholder="State/Region"*/}
                    {/*        value={values.state}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        error={Boolean(touched.state && errors.state)}*/}
                    {/*        helperText={touched.state && errors.state}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="city"
                            placeholder="City"
                            value={values.city}
                            onChange={handleChange}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="street"
                            placeholder="street"
                            value={values.street}
                            onChange={handleChange}
                            error={Boolean(touched.street && errors.street)}
                            helperText={touched.street && errors.street}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="zipCode"
                            placeholder="Zip/Code"
                            value={values.zipCode}
                            onChange={handleChange}
                            error={Boolean(touched.zipCode && errors.zipCode)}
                            helperText={touched.zipCode && errors.zipCode}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <LightTextField
                            fullWidth
                            name="companyName"
                            placeholder="Company Name"
                            value={values.companyName}
                            onChange={handleChange}
                            error={Boolean(touched.companyName && errors.companyName)}
                            helperText={touched.companyName && errors.companyName}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                            Save Billing Info
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    );
};

export default AddBillingInfo;