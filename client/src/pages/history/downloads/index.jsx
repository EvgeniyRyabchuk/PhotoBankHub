import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import CustomTable from "../../../components/userManagement/CustomTable";
import SearchInput from "../../../components/UI/SearchInput";
import {StyledFlexBox} from "./styled";
import {useSelector} from "react-redux";
import ClientService from "../../../services/ClientService";
import useDebounce from "../../../hooks/useDebounce";
import {defPage} from "../../../utills/const";
import DownloadListColumnShape from "./columnShape";


const Downloads = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const [downloads, setDownloads] = useState([]);
    const [page, setPage] = useState(defPage);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search, 500);

    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const fetchDownloads = async () => {
        const { data } = await ClientService.getDownloads(user.client.id, location.search);
        setDownloads(data.data);
        setTotal(data.total);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])


    useEffect(() => {
        fetchDownloads();
    }, [searchParams])

    useEffect(() => {
        const params = {};
        if(page && page !== defPage) params.page = page;
        if(debounceSearch && debounceSearch !== '') params.search = search;
        setSearchParams(params);
    }, [page, debounceSearch]);

    return (
        <Box pt={2} pb={4} mx={4} mt={4}>
            <StyledFlexBox>
                <SearchInput
                    placeholder="Search user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                />
            </StyledFlexBox>

            <Box sx={{ overflowX: 'scroll' }}>
                <CustomTable
                    columnShape={DownloadListColumnShape}
                    data={downloads}
                    page={page}
                    setPage={setPage}
                    total={total}
                />
            </Box>

        </Box>
    );
};

export default Downloads;