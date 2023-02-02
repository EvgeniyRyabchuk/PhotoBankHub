import React, {useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {NavLink, useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel, Radio, RadioGroup,
} from "@mui/material";

import {SocialIconButton, TextFieldWrapper,} from "../../../components/UI/SocialButtons";
import {useFormik} from "formik";
import * as Yup from "yup";
import FacebookIcon from "../../../assets/icons/FacebookIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import {toast} from "react-toastify";
import {FlexBox, JustifyBox, JustifyContent} from "../../../assets/shared/styles";
import {H1, H3, Small} from "../../../assets/typography";
import LightTextField from "../../../components/UI/LightTextField";
import SocialAuth from "../SocialAuth";
import LogoImage from '../../../assets/images/custom/small_logo_main.png';

const Register = () => {
    const { register } = useAction();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        roleId: 1,
        terms: true,
        submit: null,
    };
    // form field value validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password should be of minimum 6 characters length")
            .required("Password is required"),
        roleId: Yup.number().required("Role required")
    });

    const submit = async (values) => {
        setLoading(true);
        try {
            const newUser = {
                email: values.email,
                password: values.password,
                name: values.name,
                roleId: values.roleId,
            }
            await register(newUser);
            setLoading(false);
            toast.success("You registered successfully");
            navigate(`/login`);
        } catch (error) {
            setError(error?.message);
            setLoading(false);
        }
    }

    const { errors, values, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit: submit
        });

    return (
        <JustifyBox sx={{mt: 5, height: { sm: "100%" } }}>
            <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
                <FlexBox
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    mb={5}
                >
                    <Box width={100} mb={1}>
                        <img src={LogoImage} width="100%" alt="Logo" />
                    </Box>
                    <H1 fontSize={24} fontWeight={700}>
                        Registration
                    </H1>
                </FlexBox>

                <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
                  <SocialAuth extraData={{roleId: values.roleId}} />

                    <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
                        <H3 color="text.disabled" px={1}>
                            Or
                        </H3>
                    </Divider>

                    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <FlexBox justifyContent="space-between" flexWrap="wrap">
                            <TextFieldWrapper>
                                <LightTextField
                                    fullWidth
                                    name="name"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name || ""}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </TextFieldWrapper>

                            <TextFieldWrapper>
                                <LightTextField
                                    fullWidth
                                    name="email"
                                    type="email"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email || ""}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </TextFieldWrapper>
                        </FlexBox>

                        <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
                            <LightTextField
                                fullWidth
                                name="password"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password || ""}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </TextFieldWrapper>

                        <br/>

                         <FormControl>
                             <FormLabel id="demo-row-radio-buttons-group-label">
                                 Register As
                             </FormLabel>
                             <RadioGroup
                                 name="roleId"
                                 label="Role"
                                 value={values.roleId}
                                 onChange={(e, value) => {
                                     setFieldValue('roleId', value);
                                 }}
                                 row
                                 aria-labelledby="demo-row-radio-buttons-group-label"
                                 defaultValue={initialValues.roleId}
                             >
                                 <FormControlLabel value="1" control={<Radio />} label="Client" />
                                 <FormControlLabel value="2" control={<Radio />} label="Creator" />
                             </RadioGroup>
                         </FormControl>

                        <br/>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    disableRipple
                                    checked={values.terms}
                                    onChange={handleChange}
                                    name="terms"
                                />
                            }
                            label="I agree to terms & conditions"
                            sx={{
                                marginTop: "0.5rem",
                                "& .MuiTypography-root": { fontWeight: 600 },
                            }}
                        />

                        {error && (
                            <FormHelperText
                                error
                                sx={{
                                    mt: 2,
                                    fontSize: 13,
                                    fontWeight: 500,
                                    textAlign: "center",
                                }}
                            >
                                {error}
                            </FormHelperText>
                        )}

                        <Box sx={{ mt: 4 }}>
                            {loading ? (
                                <LoadingButton loading fullWidth variant="contained">
                                    Sign Up
                                </LoadingButton>
                            ) : (
                                <Button fullWidth type="submit" variant="contained">
                                    Sign Up
                                </Button>
                            )}
                        </Box>
                    </form>

                    <Small margin="auto" mt={3} color="text.disabled">
                        Do you already have an account?{" "}
                        <NavLink to="/login">
                            <Small color="primary.main">Log in</Small>
                        </NavLink>
                    </Small>
                </FlexBox>
            </Card>
        </JustifyBox>
    );
};

export default Register;








// const Register = () => {
//
//     const { register } = useAction();
//
//     const [name, setName] = useState('Jeka');
//     const [email, setEmail] = useState('jeka.rubchuk@gmail.com');
//     const [password, setPassword] = useState('123456789');
//     const [roleId, setRoleId] = useState('1');
//
//     const navigate = useNavigate();
//
//     const submit = async (e) => {
//         e.preventDefault();
//         const newUser = {name, email, roleId, password};
//         await register(newUser);
//         navigate(`/login`);
//     }
//
//     return (
//         <div>
//             <h1>Register</h1>
//
//             <form action="" onSubmit={submit}>
//
//                 <input
//                     type="text"
//                     name='name'
//                     onChange={(e) =>
//                            setName(e.target.value)}
//                     value={name}
//                 />
//
//                 <br/>
//                 <br/>
//
//                 <input
//                     type="email"
//                     name='email'
//                     onChange={(e) =>
//                            setEmail(e.target.value)}
//                     value={email}
//                 />
//
//                 <br/>
//                 <br/>
//                 <input
//                     type="password"
//                     name='password'
//                     onChange={(e) =>
//                         setPassword(e.target.value)}
//                     value={password}
//                 />
//
//                 <br/>
//                 <br/>
//
//                 <FormControl>
//                     <FormLabel id="demo-row-radio-buttons-group-label">
//                         Register As
//                     </FormLabel>
//                     <RadioGroup
//                         onChange={(e, value) => {
//                             setRoleId(value);
//                         }}
//                         row
//                         aria-labelledby="demo-row-radio-buttons-group-label"
//                         name="row-radio-buttons-group"
//                         defaultValue={1}
//
//                     >
//                         <FormControlLabel value="1" control={<Radio />} label="Client" />
//                         <FormControlLabel value="2" control={<Radio />} label="Creator" />
//                     </RadioGroup>
//                 </FormControl>
//
//                 <br/>
//
//                 <button>Submit</button>
//             </form>
//
//
//         </div>
//     );
// };
//
// export default Register;