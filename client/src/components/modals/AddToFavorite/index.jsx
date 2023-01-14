import React, {useEffect, useState} from 'react';
import ModalWithTransition from "../ModalWithTransition";
import {ModalTransitionType, SimpleModalModeList} from "../../../utills/const";
import FavoriteService from "../../../services/FavoriteService";
import {useSelector} from "react-redux";
import {
    Box,
    Button,
    Checkbox, CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel
} from "@mui/material";
import {useFetching} from "../../../hooks/useFetching";
import CreateFavorite from "./CreateFavorite";

const AddToFavorite = ({
        isOpen,
        onClose,
        mode = SimpleModalModeList.create,
        transitionType = ModalTransitionType.two,
        image
   }) => {

    const { user } = useSelector(state => state.user);
    const [favorites, setFavorites] = useState([]);

    const [sourceCheckBoxValue, setSourceCheckBoxValue] = useState([]);
    const [checkBoxValues, setCheckBoxValues] = useState([]);

    const fetchFavorites = async () => {
        const { data } = await FavoriteService.getFavorites(user.client.id, image.id);
        setFavorites(data);
        const checkBoxList = data.map(f => f.imageIds.find(e => e == image.id) ? true : false);
        setCheckBoxValues(checkBoxList);
        setSourceCheckBoxValue(checkBoxList);
    }

    useEffect(() => {
        fetchFavorites();
    }, [image]);

    const [favoriteChange, favoriteChangeLoading, favoriteChangeError] =
        useFetching(async (favorite, isAdd) =>  {
            let data = null;
            let newImageCount = favorite.images_count;
            if(isAdd) {
                const response = await FavoriteService.addImageToFavorite(user.client.id, favorite.id, image.id);
                newImageCount++;
                data = response.data;
            } else {
                const response = await FavoriteService.removeImageFromFavorite(user.client.id, favorite.id, image.id);
                newImageCount--;
                data = response.data;
            }

            const newFavorites =
                favorites.map(f => f.id === favorite.id ?
                {...data, images_count: newImageCount} : f);
            setFavorites(newFavorites);
    });

    const [createFavorite, createFavoriteLoading, createFavoriteError] =
        useFetching(async (title) => {
        const { data } = await FavoriteService.createFavorite(user.client.id, title);
        fetchFavorites();
    });


    const onFavoriteChange = async (favorite, index) => {
        const value = !checkBoxValues[index];
        favoriteChange(favorite, value)

        const newCheckBoxList= checkBoxValues.map((value, i) =>
            index === i ? !value : value);
        setCheckBoxValues(newCheckBoxList);
    }

    const onSave = () => {
        onClose();
    }


    return (
        <ModalWithTransition
            type={transitionType}
            onClose={onClose}
            isOpen={isOpen}
            title='Select Your Favorite Folder'>

            {
                createFavoriteLoading || favoriteChangeLoading &&
                <CircularProgress />
            }
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
               <CreateFavorite
                    onChange={(value) => createFavorite(value)}
               />
                <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                >
                    <FormGroup sx={{ maxHeight: '300px', overflowY: 'auto'}}>
                        {
                            !favoriteChangeLoading && favorites.map((favorite, index) =>
                                <FormGroup key={favorite.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkBoxValues[index]}
                                                onChange={() => onFavoriteChange(favorite, index)}

                                            />
                                        }
                                        label={`${favorite.title} (${favorite.images_count})`}
                                    />
                                </FormGroup>
                            )
                        }

                    </FormGroup>

                    <FormHelperText
                        sx={{ my: 3}}>
                        Total Favorites Count: {favorites.length}
                    </FormHelperText>

                    {
                        JSON.stringify(sourceCheckBoxValue) !== JSON.stringify(checkBoxValues) &&
                        <Button
                            sx={{ mt: 2}}
                            variant='contained'
                            onClick={onSave}
                            color='primary'
                        >
                            Save
                        </Button>
                    }

                </FormControl>
            </Box>
        </ModalWithTransition>
    );
};

export default AddToFavorite;