import React from 'react';
import Stack from "@mui/material/Stack";
import {defPage} from "../../utills/const";
import {Box, Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {JustifyBox} from "../../assets/shared/styles";
import Pagination from '@mui/material/Pagination';

const PaginationBar = ({ page, limit, minLimit, totalPage, onPageChange, onLimitChange, onShowMore }) => {
    return (
        <JustifyBox sx={{ my: 5 }}>
            <Stack spacing={2}>
                <Pagination
                    count={totalPage}
                    defaultPage={defPage}
                    siblingCount={2}
                    page={page}
                    onChange={onPageChange}
                    color='primary'
                />
            </Stack>
            <Box sx={{ width: 200 }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        size='small'
                        labelId="demo-simple-select-label"
                        defaultValue={limit}
                        value={limit}
                        label="Per page"
                        onChange={onLimitChange}
                    >
                        <MenuItem value={minLimit}>{minLimit}</MenuItem>
                        <MenuItem value={minLimit*2}>{minLimit*2}</MenuItem>
                        <MenuItem value={minLimit*3}>{minLimit*3}</MenuItem>
                    </Select>
                </FormControl>
                <Button sx={{ minHeight: '100%'}}
                        variant='outlined'
                        type='button'
                        onClick={onShowMore}
                >
                    Show More
                </Button>
            </Box>

        </JustifyBox>
    );
};

export default PaginationBar;