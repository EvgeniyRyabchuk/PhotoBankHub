import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import FilterSectionLayout from "./FilterSectionLayout";

const CheckBoxPicker = ({ title, isReset, checkBoxList, setCheckBoxList}) => {
    const handleLevelCheck = (checkBoxId, checked) => {
        const newCheckBoxList = checkBoxList.map((e) => {
            if(e.id === checkBoxId) {
                e.checked = checked
                return e;
            } else { return e; }
        });
        setCheckBoxList(newCheckBoxList);
    }
    return (
        <FilterSectionLayout title={title}>
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
        </FilterSectionLayout>
    );
};

export default CheckBoxPicker;