import React from 'react';
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {TextField} from "@mui/material";

const DateRange = ({ title, name, range, onFromChange, onToChange }) => {


    return (
        <>
            <Typography id="non-linear-slider" gutterBottom>
                {title}
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="From created at"
                        inputFormat="dd/MM/yyyy"
                        value={range[0]}
                        onChange={(value) => value && onFromChange(value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        label="To created at"
                        inputFormat="dd/MM/yyyy"
                        value={range[1]}
                        onChange={(value) => value && onToChange(value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
        </>
    );
};

export default DateRange;