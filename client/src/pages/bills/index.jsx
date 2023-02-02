import React, {useEffect, useRef, useState} from 'react';
import AddBillingInfo from "../../components/AddBillingInfo";
import {
    Box, Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import CardManagement from "../../components/Payment/CardManagement";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFetching} from "../../hooks/useFetching";
import BillingService from "../../services/BillingService";
import {defPage} from "../../utills/const";
import {StyledFlexBox} from "../history/downloads/styled";
import SearchInput from "../../components/UI/SearchInput";
import CustomTable from "../../components/userManagement/CustomTable";

import moment from "moment";
import BillsListColumnShape from "./columnShape";
import {useAction} from "../../hooks/useAction";

const Bills = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { profile } = useAction();

    const { user } = useSelector(state => state.user);
    const [billingInfo, setBillingInfo] = useState(null);
    const [bills, setBills] = useState([]);

    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const { cards } = useSelector(state => state.card);

    const [tableRows, setTableRow] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const [page, setPage] = useState(defPage);
    const [totalPage, setTotalPage] = useState(0);

    const [search, setSearch] = useState('');

    const [fetchingBills, isLoading, error] = useFetching(async () => {
        const { data } = await BillingService.getBills(page);
        setTotalPage(data.total);
        setBills(data.data);
    });

    const billsTableRef = useRef();

    useEffect(() => {
        if(isInitialized) {
            fetchingBills();
            billsTableRef.current.scrollIntoView();
        }
    }, [page]);

    useEffect(() => {
        const plan = user.client.plan;
        const period = user.client.valid_period_type;
        const image_count = user.client.left_image_count;
        const expiredAt = moment(user.client.plan_expired_at).format('yyyy-MM-DD');

        const rows = [
            { title: 'Plan Name', value: plan ? plan.name : 'no plan' },
            { title: 'Period', value: period },
            { title: 'Current Available Image Count', value: image_count },
            { title: 'Expired At', value: expiredAt },
        ];

        if(cards.length > 0) {
            const activeCard = cards.find(card => card.isMain);
            setActiveCard(activeCard);
        }

        if(!isInitialized) {
            fetchingBills();
        }

        setTableRow(rows);
        setIsInitialized(true);
    }, [cards]);

    const unsubscribe = async () => {
        await BillingService.unsubscribe();
        await profile();
    }

    return (
        <Box sx={{ my: 5}}>
            <Typography variant='h4'>
                Bills
            </Typography>

            <Box>
                { user.client.valid_period_type &&
                    <Button fullWidth variant='outlined' onClick={unsubscribe}>
                        Unsubscribe
                    </Button>
                }

            </Box>
            <Grid container spacing={3} sx={{ mt: 1, mb: 3, px: 3}}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}
                      sx={{ paddingTop: '0 !important'}}>

                    <CardManagement
                        viewMode='mini'
                        onCardSelected={(card) => {setSelectedCard(card);}}
                        cardListMinHeight='auto'
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Box >
                        <Typography variant='h5'>Subscription</Typography>
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

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ p: 3}}>
                <StyledFlexBox>
                    <SearchInput
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </StyledFlexBox>

                <Box ref={billsTableRef} id="bills_table" sx={{ overflowX: 'scroll' }}>
                    <CustomTable
                        columnShape={BillsListColumnShape}
                        data={bills}
                        page={page}
                        setPage={setPage}
                        total={totalPage}
                        limit={8}
                    />
                </Box>
            </Box>


            <AddBillingInfo onSave={(values) => { setBillingInfo(values) }} />
        </Box>
    );
};

export default Bills;