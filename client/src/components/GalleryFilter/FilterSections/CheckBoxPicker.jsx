import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const CheckBoxPicker = ({ title, isReset, checkBoxList, setCheckBoxList}) => {
    const handleLevelCheck = (typeId, checked) => {
        const newCheckBoxList = checkBoxList.map((e) => {
            if(e.id === typeId) {
                e.checked = checked
                return e;
            } else { return e; }
        });
        setCheckBoxList(newCheckBoxList);
    }

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
                    { checkBoxList.map((item) =>
                        <FormControlLabel
                            key={item.id}
                            control={
                                <Checkbox
                                    checked={item.checked}
                                    onChange={(e, data) =>
                                        handleLevelCheck(item.id, data)
                                    }
                                />
                            }
                            label={item.name} />
                    )}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default CheckBoxPicker;