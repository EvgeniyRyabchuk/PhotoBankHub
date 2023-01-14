import React from 'react';
import StatusWrapper from "../index";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {JustifyContent} from "../../../assets/shared/styles";
import {CreditCardOff, CreditScore} from "@mui/icons-material";
import moment from "moment";

const PaymentFail = () => {
    const navigate = useNavigate();

    const { user, isAuth, loading } = useSelector(store => store.user);

    return (
        <Box sx={{ mt: 5, height: '1000px', background: 'white'}}>
            <JustifyContent >
                <Box>
                    <Typography variant='h4'>
                        Something was wrong
                        <Box sx={{ mx: 2}}>
                            <CreditCardOff sx={{ fontSize: '40px'}} />
                        </Box>
                    </Typography>
                    <Typography variant='h6'>
                        Please checkout your credit card info is valid
                    </Typography>
                    <p>
                        or try it again letter
                    </p>
                    <br/>

                </Box>
            </JustifyContent>

            <Button
                sx={{ width: '300px'}}
                variant={'contained'}
                color={'primary'}
                onClick={() => navigate('/')}
            >
                Back To Home
            </Button>
        </Box>

    );
};

export default PaymentFail;