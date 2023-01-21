import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {ModalTransitionType, SimpleModalModeList} from "../../../../utills/const";
import CollectionService from "../../../../services/CollectionService";
import {useFetching} from "../../../../hooks/useFetching";
import ModalWithTransition from "../../ModalWithTransition";
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText
} from "@mui/material";

const AddToCollection = ({
         isOpen,
         onClose,
         mode = SimpleModalModeList.create,
         transitionType = ModalTransitionType.two,
         image
     }) => {

    const { user } = useSelector(state => state.user);
    const [collections, setCollections] = useState([]);

    const [sourceCheckBoxValue, setSourceCheckBoxValue] = useState([]);
    const [checkBoxValues, setCheckBoxValues] = useState([]);

    const fetchCollections = async () => {
        const { data } = await CollectionService.getCollections(`?creatorId=${user.creator.id}`);
        setCollections(data);
        const checkBoxList = data.map(f => f.imageIds.find(e => e == image.id) ? true : false);
        setCheckBoxValues(checkBoxList);
        setSourceCheckBoxValue(checkBoxList);
    }

    useEffect(() => {
        fetchCollections();
    }, [image]);

    const [collectionChange, collectionChangeLoading, collectionChangeError] =
        useFetching(async (collection, isAdd) =>  {
            let data = null;
            let newImageCount = collection.images_count;
            if(isAdd) {
                const response = await CollectionService.addImageToCollection(collection.id, image.id);
                data = response.data;
                newImageCount = response.data.images_count;
            } else {
                const response = await CollectionService.removeImageFromCollection(collection.id, image.id);
                data = response.data;
                newImageCount = response.data.images_count;
            }

            const newCollections =
                collections.map(f => f.id === collection.id ?
                    {...data, images_count: newImageCount} : f);
            setCollections(newCollections);
        });

    const onCollectionChange = async (collection, index) => {
        console.log(123);
        const value = !checkBoxValues[index];
        collectionChange(collection, value)

        const newCheckBoxList= checkBoxValues.map((value, i) =>
            index === i ? !value : value);
        setCheckBoxValues(newCheckBoxList);
    }

    const onSave = () => {
        onClose();
    }

    console.log(isOpen)

    return (
        <ModalWithTransition
            type={transitionType}
            onClose={onClose}
            isOpen={isOpen}
            title='Select Your Collection'>

            {collectionChangeLoading &&
                <CircularProgress />
            }
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                >
                    <FormGroup sx={{ maxHeight: '300px', overflowY: 'auto'}}>
                        {
                            !collectionChangeLoading && collections.map((collection, index) =>
                                <FormGroup key={collection.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkBoxValues[index]}
                                                onChange={() => onCollectionChange(collection, index)}

                                            />
                                        }
                                        label={`${collection.name} (${collection.images_count})`}
                                    />
                                </FormGroup>
                            )
                        }

                    </FormGroup>

                    <FormHelperText
                        sx={{ my: 3}}>
                        Total Collection Count: {collections.length}
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

export default AddToCollection;