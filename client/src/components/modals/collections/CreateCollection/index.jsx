import React, {useState} from 'react';
import ModalWithTransition from "../../ModalWithTransition";
import {Box, Button, ButtonGroup, Grid, TextField} from "@mui/material";
import {ModalTransitionType} from "../../../../utills/const";

const CreateCollectionModal = ({ onChange, isOpen, setIsOpen, ...props}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <ModalWithTransition
            title='Create Collection'
            type={ModalTransitionType.three}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Box>
                <Grid container spacing={3} {...props}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            sx={{ flexGrow: 6, px: 1 }}
                            id="outlined-basic"
                            label="Enter Collection Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            label="Enter Collection Description"
                            multiline
                            sx={{ flexGrow: 6, px: 1 }}
                            variant="outlined"
                            maxRows={4}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                        setIsOpen(false);
                        onChange({ name, description });
                    }}>
                    Create New Favorite Folder
                </Button>
            </Box>
        </ModalWithTransition>
    );
};

export default CreateCollectionModal;