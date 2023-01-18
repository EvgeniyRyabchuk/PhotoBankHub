import React, {useState} from 'react';
import {Box, Button, ButtonGroup, TextField} from "@mui/material";

const CreateFavorite = ({ onChange, ...props }) => {

    const [create, setCreate] = useState(false);
    const [value, setValue] = useState('');

    return (
        <Box
            {...props}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}
        >
            {
                create ?
                    <>
                        <TextField
                            sx={{ flexGrow: 6, px: 1 }}
                            id="outlined-basic"
                            label="Enter Favorite Title"
                            variant="outlined"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                        />
                        <ButtonGroup sx={{ flexGrow: 1, px: 1 }} aria-label="outlined primary button group">
                            <Button
                                sx={{ width: '50%' }}
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    if(value !== '')
                                        onChange(value);
                                    setCreate(false);
                                }}>
                                Add
                            </Button>
                            <Button
                                sx={{ width: '50%' }}
                                variant='outlined'
                                color='secondary'
                                onClick={() => {
                                    setCreate(false);
                                }}>
                                Cancel
                            </Button>
                        </ButtonGroup>

                    </>
                    :
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => setCreate(true)}>
                    Create New Favorite Folder
                </Button>
            }

        </Box>
    );
};

export default CreateFavorite;