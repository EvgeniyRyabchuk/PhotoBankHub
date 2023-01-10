import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";

const CreateFavorite = ({ onChange }) => {

    const [create, setCreate] = useState(false);
    const [value, setValue] = useState('');

    return (
        <Box
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
                            sx={{ flexGrow: 6, px: 1, minWidth: '300px' }}
                            id="outlined-basic"
                            label="Enter Favorite Title"
                            variant="outlined"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                        />
                        <Button
                            sx={{ flexGrow: 1, px: 1 }}
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                if(value !== '')
                                    onChange(value);
                                setCreate(false);
                            }}>
                                Add
                        </Button>
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