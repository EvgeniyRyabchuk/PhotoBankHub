import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import FavoriteService from "../../../services/FavoriteService";
import CollectionService from "../../../services/CollectionService";
import {getPreview, imagePlaceholder} from "../../../utills/axios";
import {FavoriteCardImage, FavoriteCardWrapper} from "../../favorites/all/styled";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {TextWithEllipsis} from "../../../assets/typography";
import CreateCollectionModal from "../../../components/modals/collections/CreateCollection";
import {toast} from "react-toastify";


export const CollectionCard = ({ collection, isBottomMenuShow = true }) => {
    const navigate = useNavigate();

    const getLastImage = (collection) => collection.images.length > 0 ?
        getPreview(collection.images[0].preview) :
        imagePlaceholder

    return (
        <FavoriteCardWrapper style={{ height: isBottomMenuShow ? '350px' : '300px' }} key={collection.id}>
            <Card>
                <Box sx={{ cursor: 'pointer' }}
                     onClick={() => navigate(`/collections/${collection.id}`)}>
                    <Box sx={{ height: '140px', overflow: 'hidden', position: 'relative'}}>
                        <FavoriteCardImage src={getLastImage(collection)} alt="green iguana"/>
                    </Box>
                    <CardContent>
                        <TextWithEllipsis gutterBottom variant="h6" component="div">
                            {collection.name}
                        </TextWithEllipsis>
                        <TextWithEllipsis gutterBottom variant="h6" component="div">
                            {collection.description}
                        </TextWithEllipsis>
                        <Typography variant="body2" color="text.secondary">
                            Images: {collection.images_count ?? '0'}
                        </Typography>
                    </CardContent>
                </Box>
                {
                    isBottomMenuShow &&
                    <CardActions>
                        <Button size="small">Edit</Button>
                        <Button size="small">Delete</Button>
                    </CardActions>
                }

            </Card>
        </FavoriteCardWrapper>
    )
}

const Collections = () => {

    const { user, isAuth } = useSelector(state => state.user);
    const [addToCollectionOpen, setAddToCollectionOpen] = useState(false);
    const navigate = useNavigate();
    const [collections, setCollections] = useState([]);


    const [createCollection, createCollectionLoading, createCollectionError] =
        useFetching(async (name, description) => {
            const { data } = await
                CollectionService.createCollection(user.client.id, name, description);
            setCollections([data, ...collections])
    });

    useEffect(() => {
        const fetchCollections = async () => {
            const { data } = await CollectionService.getCollections(`?creatorId=${user.creator.id}`);
            setCollections(data);
        }
        fetchCollections();
    }, [])



    
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const modalValueChange = async (data) => {
        const { name, description } = data;
        const { data: newCollection} = await CollectionService.createCollection(name, description);
        setIsModalOpen(false);
        toast.success('Collection Created Success');
        setCollections([newCollection, ...collections]);
    }
    
    return (
        <Box>
            <Button sx={{ my: 3}} variant={'contained'} onClick={() => setIsModalOpen(true)}>
                Create New Collection 
            </Button>

            {
                isModalOpen &&
                <CreateCollectionModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    onChange={modalValueChange}
                />
            }

            <br/>

            Collections
            <Box sx={{ px: 2,  display: 'flex',  flexWrap: 'wrap', }}>
                {collections.map(collection =>
                    <CollectionCard collection={collection} />
                )}
            </Box>
        </Box>
    );
};

export default Collections;