import React, {useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {NavLink, useNavigate} from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Card, Checkbox,
    Divider,
    FormControlLabel, FormGroup,
    FormHelperText,
    Switch,
} from "@mui/material";
import {
    SocialIconButton,
    TextFieldWrapper,
} from "../../../components/UI/SocialButtons";
import {FlexBox} from "../../../assets/shared/styles/index";
import LightTextField from "../../../components/UI/LightTextField";
import { useFormik } from "formik";
import FacebookIcon from "../../../assets/icons/FacebookIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {H1, H3, Paragraph, Small} from "../../../assets/typography";
import {Link} from "../../../components/Footer/styled";


const Login = () => {
    const { login } = useAction();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const initialValues = {
        email: "demo@example.com",
        password: "v&)3?2]:",
        submit: null,
        remember: true,
    };
    // form field value validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password should be of minimum 6 characters length")
            .required("Password is required"),
    });

    const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit: (values) => {
                setLoading(true);
                login(values.email, values.password)
                    .then(() => {
                        setLoading(false);
                        toast.success("You Logged In Successfully test");
                        navigate("/dashboard");
                    })
                    .catch((error) => {
                        setError(error.message);
                        setLoading(false);
                    });
            },
        });

    return (
        <FlexBox
            sx={{
                marginTop: '70px',
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: { sm: "100%" },
            }}
        >
            <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
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
                        Sign In to Uko
                    </H1>
                </FlexBox>

                <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
                    <SocialIconButton
                        sx={{ boxShadow: 1 }}
                        // onClick={loginWithGoogle}
                        startIcon={<GoogleIcon sx={{ mr: 1 }} />}
                    >
                        Sign in with Google
                    </SocialIconButton>
                    <SocialIconButton
                        sx={{ boxShadow: 1 }}
                        // onClick={loginWithFacebook}
                        startIcon={<FacebookIcon sx={{ mr: 1 }} />}
                    >
                        Sign in with Facebook
                    </SocialIconButton>

                    <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
                        <H3 color="text.disabled" px={1}>
                            Or
                        </H3>
                    </Divider>

                    <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <FlexBox justifyContent="space-between" flexWrap="wrap">
                            <TextFieldWrapper>
                                <Paragraph fontWeight={600} mb={1}>
                                    Email
                                </Paragraph>
                                <LightTextField
                                    fullWidth
                                    name="email"
                                    type="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email || ""}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </TextFieldWrapper>

                            <TextFieldWrapper>
                                <Paragraph fontWeight={600} mb={1}>
                                    Password
                                </Paragraph>
                                <LightTextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password || ""}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </TextFieldWrapper>
                        </FlexBox>

                        <FlexBox mt={2} alignItems="center" justifyContent="space-between">
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="remember"
                                        checked={values.remember}
                                        onChange={handleChange}
                                    />
                                }
                                label="Remember Me"
                                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
                            />
                            <NavLink to="/forget-password">
                                <Small color="secondary.red">Forgot Password?</Small>
                            </NavLink>
                        </FlexBox>

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
                                    Sign In
                                </LoadingButton>
                            ) : (
                                <Button fullWidth type="submit" variant="contained">
                                    Sign In
                                </Button>
                            )}
                        </Box>
                    </form>

                    <Small margin="auto" mt={3} color="text.disabled">
                        Don't have an account?{" "}
                        <NavLink to="/register">
                            <Small color="primary.main">Create an account</Small>
                        </NavLink>
                    </Small>
                </FlexBox>
            </Card>
        </FlexBox>
    );
};

export default Login;



// const LogIn = () => {
//
//     const { login } = useAction();
//
//     const navigate = useNavigate();
//
//     const [email, setEmail] = useState('nicholasrobinson@gmail.com');
//     const [password, setPassword] = useState('password');
//     const [rememberMe, setRememberMe] = useState(true);
//
//     const submit = async (e) => {
//         e.preventDefault();
//         const data =  await login(email, password, rememberMe);
//         console.log(data)
//         setTimeout(() =>
//             navigate(`/profile`),
// 0);
//     }
//
//
//     const logInAsNewClientJeka = () => {
//         setEmail('jeka.rubchuk@gmail.com');
//         setPassword('123456789');
//     }
//
//
//     return (
//         <div>
//             <h1>Log In</h1>
//
//             <form action="" onSubmit={submit}>
//                 <input type="text"
//                        name='email'
//                        onChange={(e) =>
//                            setEmail(e.target.value)}
//                        value={email}/>
//                 <br/>
//                 <br/>
//                 <input
//                     type="password"
//                     name='password'
//                     onChange={(e) =>
//                         setPassword(e.target.value)}
//                     value={password}
//                 />
//                 <br/>
//                 <br/>
//
//                 <Box sx={{ display: 'flex', justifyContent: 'center'}}>
//                     <FormGroup>
//                         <FormControlLabel
//
//                             control={
//                                 <Checkbox
//                                     checked={rememberMe}
//                                     onChange={(e, value) =>
//                                         setRememberMe(value)
//                                     }
//                                 />}
//                             label="Remember Me"
//                         />
//                     </FormGroup>
//                 </Box>
//
//
//                 <button>Submit</button>
//             </form>
//
//
//             <Button
//                 onClick={logInAsNewClientJeka}
//                 variant='contained'
//             >
//                 Log in as Jeka
//             </Button>
//         </div>
//     );
// };
//
// export default LogIn;