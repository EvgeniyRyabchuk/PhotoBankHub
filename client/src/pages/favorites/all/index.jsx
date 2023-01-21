import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CreateFavorite from "../../../components/modals/favorites/CreateFavorite";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteService from "../../../services/FavoriteService";
import {getPreview, imagePlaceholder} from "../../../utills/axios";
import {FavoriteCardImage, FavoriteCardWrapper} from "./styled";
import {useFetching} from "../../../hooks/useFetching";


const Favorites = () => {

    const { user, isAuth } = useSelector(state => state.user);
    const [addToFavoriteOpen, setAddToFavoriteOpen] = useState(false);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    const [createFavorite, createFavoriteLoading, createFavoriteError] =
        useFetching(async (title) => {
            const { data } = await FavoriteService.createFavorite(user.client.id, title);
            setFavorites([data, ...favorites])
    });


    useEffect(() => {
        const fetchFavorites = async () => {
            const { data } = await FavoriteService.getFavorites(user.client.id);
            setFavorites(data);
        }
        fetchFavorites();
    }, [])

    const getLastImage = (favorite) => favorite.images && favorite.images.length > 0 ?
        getPreview(favorite.images[0].preview) :
        imagePlaceholder

    return (
        <Box>

            <CreateFavorite
                style={{ margin: '20px 0', padding: '0 20px' }}
                onChange={(value) => createFavorite(value)}
            />

            <Box sx={{ px: 2, display: 'flex',  flexWrap: 'wrap', }}>
                {favorites.map(favorite =>
                        <FavoriteCardWrapper key={favorite.id}>
                            <Card>
                                <Box sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/favorites/${favorite.id}`)}>
                                    <Box sx={{ height: '140px', overflow: 'hidden', position: 'relative'}}>
                                        <FavoriteCardImage src={getLastImage(favorite)} alt="green iguana"/>
                                    </Box>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {favorite.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Images: {favorite.images_count ?? '0'}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <CardActions>
                                    <Button size="small">Edit</Button>
                                    <Button size="small">Delete</Button>
                                </CardActions>
                            </Card>
                        </FavoriteCardWrapper>
                    )
                }
            </Box>
        </Box>
    );
};

export default Favorites;