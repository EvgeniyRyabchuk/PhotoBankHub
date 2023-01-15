import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PlanService from "../../services/PlansService";
import {
    Box, Button,
    CircularProgress,
    Grid,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography, useTheme
} from "@mui/material";
import CardManagement from "../../components/Payment/CardManagement";
import {getLast4Numbers} from "../../components/Payment/shared";
import AddBillingInfo from "../../components/AddBillingInfo";
import {Payment} from "@mui/icons-material";
import {toast} from "react-toastify";
import BillingService from "../../services/BillingService";
import CreditCardService from "../../services/CreditCardService";
import {setCards} from "../../store/action-creator/card";


const CheckOutWrapper = styled(Box)(({ theme,  }) => ({
    width: '1200px',
    margin: '0 auto',
    padding: '2rem',

    [theme.breakpoints.down('lg')]: {
        width: '100%',
    }
}))

const CheckOut = () => {

    const theme = useTheme();

    const navigate = useNavigate();
    const { cards } = useSelector(state => state.card);

    const [searchParams, setSearchParams] = useSearchParams();

    const periods = [
        'monthly',
        'yearly'
    ]

    const { user } = useSelector(state => state.user);
    const [billingInfo, setBillingInfo] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const [plan, setPlan] = useState(null);

    const [tableRows, setTableRow] = useState(null);

    const [fetching, isLoading, error] = useFetching(async () => {
        const planId = searchParams.get('planId');
        const period = periods[searchParams.get('periodIndex')];

        const { data: plan } = await PlanService.show(planId);
        setPlan(plan);

        const amount = period === 'monthly' ? plan.amount : plan.amount * 12;
        const imageCount = period === 'monthly' ? plan.image_count : plan.image_count * 12;

        setTableRow([
            { title: 'Plan Name', value: plan.name },
            { title: 'Period', value: period },
            { title: 'Amount', value: `$${amount}`},
            { title: 'Image Count Per Period', value: imageCount },
            { title: 'Description', value: plan.description },
        ])
    });

    useEffect(() => {
        fetching();
    }, []);

    const onBuyClickHandler = async () => {
        if(!selectedCard) toast.error('Please add/select for your credit card');
        if(!plan) toast.error('Please select plan');
        if(!billingInfo) toast.error('Please add billing info');

        const period = periods[searchParams.get('periodIndex')];

        try {
            const { data } = await BillingService.subscribe(
                plan.id,
                selectedCard.id,
                period,
                billingInfo.id
            );

            toast.success('Your subscription is active. Enjoy!');
            navigate('/statuses/payment/success');
        } catch (error) {
            toast.error('Fail to get subscription')
            navigate('/statuses/payment/fail');
        }
    }

    return (
        <CheckOutWrapper className='payment-block'>
            <Typography variant='h4'>Checkout</Typography>
            { isLoading && <CircularProgress /> }
            {
                !isLoading && tableRows &&
                <Grid container spacing={3} sx={{ my: 3}}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <CardManagement
                            viewMode='mini'
                            onCardSelected={ async (card) => {
                                setSelectedCard(card);
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <TableContainer component={Paper} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="left">Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableRows.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.value}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {
                                        selectedCard &&
                                        <TableRow
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                                background: theme.palette.grey.A400
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Payable card
                                            </TableCell>
                                            <TableCell align="left">
                                                {getLast4Numbers(selectedCard)}
                                            </TableCell>
                                        </TableRow>
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            }
            <AddBillingInfo onSave={(values) => { setBillingInfo(values) }} />
            <Button
                sx={{ height: '50px'}}
                fullWidth
                variant='contained'
                color='secondary'
                onClick={onBuyClickHandler}
            >
                <Payment sx={{ mx: 1}} />
                Buy
            </Button>


        </CheckOutWrapper>
    );
};

export default CheckOut;