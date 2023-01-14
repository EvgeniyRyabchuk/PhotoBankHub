import React, {useEffect} from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {JustifyContent} from "../../../assets/shared/styles";
import {CreditScore} from "@mui/icons-material";
import {useAction} from "../../../hooks/useAction";
import {useSelector} from "react-redux";
import moment from "moment";
import {useNavigate} from "react-router-dom";



const PaymentSuccess = () => {
    const navigate = useNavigate();

    const { user, isAuth, loading } = useSelector(store => store.user);

    return (
        <Box sx={{ mt: 5, height: '1000px', background: 'white'}}>
            <JustifyContent >
                <Typography variant='h4'>
                    Payment was success
                </Typography>
                <br/>
                <Box sx={{ mx: 2}}>
                    <CreditScore sx={{ fontSize: '40px'}} />
                </Box>
            </JustifyContent>

            {loading && <CircularProgress />}
            { !loading &&
                <Box sx={{ my: 3}}>
                    <Typography variant='h5'>Now Your Have: </Typography>
                    <br/>
                    <p>
                        Image Count: {user.client.left_image_count}
                    </p>
                    <p>
                        Valid Period: {user.client.valid_period_type}
                    </p>
                    <p>
                        Your plan expired at:&nbsp;
                        {moment(user.client.plan_expired_at).format('yyyy-mm-DD')}
                    </p>
                </Box>
            }

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

export default PaymentSuccess;