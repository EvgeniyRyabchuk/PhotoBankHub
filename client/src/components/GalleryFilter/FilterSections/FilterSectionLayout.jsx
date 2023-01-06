import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const FilterSectionLayout = ({ title, children }) => {
    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    { children }
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default FilterSectionLayout;