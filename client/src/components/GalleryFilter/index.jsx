import React, {useEffect, useState} from 'react';
import moment from "moment";
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FilterContent, FilterWrapper} from "./styled";
import ImageService from "../../services/ImageService";
import IndexService from "../../services/IndexService";
import DateRange from "./FilterSections/DateRange";
import CheckBoxPicker from "./FilterSections/CheckBoxPicker";
import {useFetching} from "../../hooks/useFetching";
import {useSearchParams} from "react-router-dom";

//TODO:
// categories, created_at, image_orientation, Resolution, search by image name (tags)
// search by creator name
// model
// level
// most liked, most viewed, most downloaded, Editor choose

const GalleryFilter = ({
     isOpen,
     onFilterChange,
     category,
}) => {


    const [defaultValues, setDefaultValues] = useState({
        createdAtRange: [
            new Date('1970-01-01T00:00:00'),
            new Date(),
        ],
    });

    const [checkBoxLevels, setCheckBoxLevels] = useState([]);

    const [fromCreatedAt, setFromCreatedAt] = useState(defaultValues.createdAtRange[0]);
    const [toCreatedAt, setToCreatedAt] = useState(defaultValues.createdAtRange[1]);


    const [isReset, setIsReset] = useState(false);

    const [isModelExist, setIsModelExist] = useState(false);

    const [isInitialized, setIsInitialized] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchImageMinMax = async () => {
        const {data} = await ImageService.getMinMaxValues();

        const newDefaultValue = {
            createdAtRange: [
                new Date(data.createdAt[0]),
                new Date(data.createdAt[1])
            ],
            selectedLevels: [],
        };

        setDefaultValues(newDefaultValue)

        const createdAtRange = searchParams.get('created_at_range') && searchParams.get('created_at_range').split(',');

        if(createdAtRange) {
            setFromCreatedAt(createdAtRange[0]);
            setToCreatedAt(createdAtRange[1]);
        } else {
            setFromCreatedAt(newDefaultValue.createdAtRange[0]);
            setToCreatedAt(newDefaultValue.createdAtRange[1]);
        }

    }
    const fetchLevels = async () => {
        const { data } = await IndexService.getLevels();
        const checkBoxList = data.map((e, index) => {
            return {id: index, name: e, checked: false}
        });

        const defLevels = searchParams.get('levels') && searchParams.get('levels').split(',');
        if(defLevels) {
            for (let i of defLevels) {
                for (let j of checkBoxList) {
                    if(i == j.name) {
                        j.checked = true;
                    }
                }
            }
            setCheckBoxLevels(checkBoxList);
        } else {
            setCheckBoxLevels(checkBoxList);
        }

    }

    const [ fetchInitData, isLoading, error ] = useFetching(async () => {
        await fetchLevels();
        await fetchImageMinMax();
        setIsInitialized(true);
    });



    useEffect(() => {
        fetchInitData();
    }, [])


    useEffect(() => {
        if(isOpen && isInitialized) {
            const data = {
                isModelExist: isModelExist,
                levels: checkBoxLevels.filter(e => e.checked).map(e => e.name),
                createdAtRange: [
                    moment(fromCreatedAt).format('DD-MM-yyyy'),
                    moment(toCreatedAt).format('DD-MM-yyyy'),
                ],
            };

            onFilterChange(data, isReset);
            if(isReset) setIsReset(false);
        }
    }, [checkBoxLevels, fromCreatedAt, toCreatedAt, isModelExist]);

    const resetToDefault = () => {
        setCheckBoxLevels(checkBoxLevels.map((e) => { e.checked = false; return e; }));
        setFromCreatedAt(defaultValues.createdAtRange[0]);
        setToCreatedAt(defaultValues.createdAtRange[1]);
        setIsModelExist(null);
        setIsReset(true);
    }


    return (
        <FilterWrapper isOpen={isOpen}>
            <FilterContent>
                <Button
                    variant='contained'
                    onClick={resetToDefault}
                    style={{
                        backgroundColor: 'gray',
                        color: 'white',
                        marginLeft: '10px',
                        height: '40px'
                    }}
                >
                    Reset
                </Button>

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        Project is exist
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="All"
                            // checked={projectMustExist === ProjectExistMode.ALL}
                            // onChange={() => setProjectMustExist(ProjectExistMode.ALL)}
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Project Exist"
                            // checked={projectMustExist === ProjectExistMode.EXIST}
                            // onChange={() => setProjectMustExist(ProjectExistMode.EXIST)}
                        />
                        <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Project Not Exist"
                            // checked={projectMustExist === ProjectExistMode.NOT_EXIST}
                            // onChange={() => setProjectMustExist(ProjectExistMode.NOT_EXIST)}
                        />
                    </RadioGroup>
                </FormControl>
            </FilterContent>

            {
                isLoading ?
                    <CircularProgress /> :
                    <Grid container spacing={3} style={{ padding: '15px', margin: '0'}}>
                        <Grid item md={4} xs={12}>
                            <CheckBoxPicker
                                title='Access Levels'
                                checkBoxList={checkBoxLevels}
                                setCheckBoxList={setCheckBoxLevels}
                            />
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <DateRange
                                name='created at'
                                title='Image created at data range'
                                range={[fromCreatedAt, toCreatedAt]}
                                onFromChange={value => setFromCreatedAt(value)}
                                onToChange={value => setToCreatedAt(value)}
                            />
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <Typography id="non-linear-slider" gutterBottom>
                                Deadline date range
                            </Typography>

                        </Grid>
                    </Grid>
            }

        </FilterWrapper>
    );
};

export default GalleryFilter;