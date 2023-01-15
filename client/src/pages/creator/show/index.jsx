import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import CreatorService from "../../../services/CreatorService";
import {useParams} from "react-router-dom";

const CreatorShow = () => {

    const { id } = useParams();
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            const { data } = await CreatorService.getCreator(id);
            setCreator(data);
        }
        fetchCreator();
    }, [])

    return (
        <Box sx={{ p: 5}}>

        </Box>
    );
};

export default CreatorShow;