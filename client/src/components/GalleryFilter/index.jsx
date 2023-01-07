import React, {useEffect, useState} from 'react';
import moment from "moment";
import {
    Box,
    Button, Checkbox, Chip,
    CircularProgress, Divider,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel,
    Grid,
    Radio,
    RadioGroup, Slider, TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FilterContentGrid, FilterTop, FilterWrapper, ResetBtn} from "./styled";
import ImageService from "../../services/ImageService";
import DateRange from "./FilterSections/DateRange";
import CheckBoxPicker from "./FilterSections/CheckBoxPicker";
import {useFetching} from "../../hooks/useFetching";
import {useSearchParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import {Autocomplete} from "@mui/lab";
import FilterSectionLayout from "./FilterSections/FilterSectionLayout";
import useDebounce from "../../hooks/useDebounce";
import {Close} from "@mui/icons-material";
import PhotoModelService from "../../services/PhotoModelService";
import {defIsEditorChoice, defIsModelExist, defLevel, defSizeIndex, searchParamSeparator} from "../../utills/const";
import zIndex from "@mui/material/styles/zIndex";

//TODO:
// categories, created_at, image_orientation, Resolution, search by image name (tags)
// search by creator name
// model
// level
// most liked, most viewed, most downloaded, Editor choose



const GalleryFilter = ({
     isOpen,
     onFilterChange,
     onClose
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [defaultValues, setDefaultValues] = useState(null);

    // const [checkBoxLevels, setCheckBoxLevels] = useState([]);
    const [levelsList, setLevelsList] = useState([]);
    const [level, setLevel] = useState(defLevel);

    const [checkBoxOrientations, setCheckBoxOrientations] = useState([]);

    const [sizeIndex, setSizeIndex] = useState(defSizeIndex);
    const [sizeList, setSizeList] = useState([]);

    const [fromCreatedAt, setFromCreatedAt] = useState(new Date('1970-01-01T00:00:00'));
    const [toCreatedAt, setToCreatedAt] = useState(new Date());

    // image name
    const [searchByName, setSearchByName] = useState('');
    const debouncedSearchByName = useDebounce(searchByName, 1000);

    // creator name
    const [searchByAuthorName, setSearchByAuthorName] = useState('');
    const debouncedSearchByAuthorName = useDebounce(searchByAuthorName, 1000);

    // image tags
    const [tags, setTags] = useState([]);
    const debouncedTags = useDebounce(tags, 500);


    // model name
    const [photoModelName, setPhotoModelName] = useState('');
    const debouncedPhotoModelName = useDebounce(photoModelName, 1000);

    // model age
    const [photoModelAgeRange, setPhotoModelAgeRange] = useState([1, 100]);
    const debouncedPhotoModelAgeRange = useDebounce(photoModelAgeRange, 500);

    // genders and ethnicities of photo model
    const [checkBoxGenders, setCheckBoxGenders] = useState([]);
    const [checkBoxEthnicities, setCheckBoxEthnicities] = useState([]);



    // booleans
    const [isReset, setIsReset] = useState(false);

    const [isModelExist, setIsModelExist] = useState(defIsModelExist);

    const [isEditorChoice, setIsEditorChoice] = useState(defIsEditorChoice);

    const [isInitialized, setIsInitialized] = useState(false);

    const createCheckBoxList = (data, searchParamName, isSimple = true) => {
        const defValues = searchParams.get(searchParamName)
            && searchParams.get(searchParamName).split(searchParamSeparator);

        const checkBoxList = data.map((e, index) => {
            return {id: isSimple ? index : e.id, name: isSimple ? e : e.name, checked: false}
        });

        if(isSimple) {
            if(defValues) {
                for (let i of defValues) {
                    for (let j of checkBoxList) {
                        if (i == j.name) {
                            j.checked = true;
                        }
                    }
                }
            }
        } else {
            if(defValues) {
                for (let i of defValues) {
                    for (let j of checkBoxList) {
                        if (i == j.id) {
                            j.checked = true;
                        }
                    }
                }
            }
        }
        return checkBoxList;
    }

    const changeCheckBoxList = (checkList, checkBoxList, isSimple = true) => {
        if(checkList) {
            if(isSimple) {
                return checkBoxList.map(c => {
                    let item = checkList.find(l => l == c.name);
                    if(item) c.checked = true;
                    return c;
                })
            } else {
                return checkBoxList.map(c => {
                    let item = checkList.find(l => l == c.id);
                    if(item) c.checked = true;
                    return c;
                })
            }

        }
        return checkBoxList;
    }

    const fetchImageMinMax = async () => {
        const {data} = await ImageService.getMinMaxValues();
        const newDefaultValue = {
            createdAtRange: [
                new Date(data.createdAt[0]),
                new Date(data.createdAt[1])
            ],
            selectedLevels: [],
            photoModelAgeRange: data.photoModelAgeRange,
        };

        setDefaultValues(newDefaultValue)

        const searchCreatedAtRange = searchParams.get('created_at_range') &&
            searchParams.get('created_at_range').split(searchParamSeparator);
        const searchPhotoModelAgeRange = searchParams.get('photo_model_age_range') &&
            searchParams.get('photo_model_age').split(searchParamSeparator);

        if(searchPhotoModelAgeRange) {
            setPhotoModelAgeRange(searchPhotoModelAgeRange);
        } else {
            setPhotoModelAgeRange(newDefaultValue.photoModelAgeRange);
        }

        if(searchCreatedAtRange) {
            setFromCreatedAt(searchCreatedAtRange[0]);
            setToCreatedAt(searchCreatedAtRange[1]);
        } else {
            setFromCreatedAt(newDefaultValue.createdAtRange[0]);
            setToCreatedAt(newDefaultValue.createdAtRange[1]);
        }

    }
    const fetchLevels = async () => {
        const { data } = await ImageService.getLevels();
        return data;
    }
    const fetchGenders = async () => {
        const response = await PhotoModelService.getGenders();
        return createCheckBoxList(response.data, 'genders');

    }
    const fetchEthnicities = async () => {
        const response = await PhotoModelService.getEthnicities();
        return  createCheckBoxList(response.data, 'ethnicities');
    }
    const fetchSizes = async () => {
        const response = await ImageService.getSizes();
        setSizeList(response.data);
    }
    const fetchOrientations = async () => {
        const response = await ImageService.getOrientations();
        const fotmatted = response.data.map(o => ({
            id: o.id,
            name: `${o.name} (${o.ratio_side_1}:${o.ratio_side_2})`,
        }));
        return  createCheckBoxList(fotmatted, 'orientations', false);
    }

    const [ fetchInitData, isLoading, error ] = useFetching(async () => {
        await fetchImageMinMax();
        const levelsList = await fetchLevels();
        let checkBoxGenders = await fetchGenders();
        let checkBoxEthnicities = await fetchEthnicities();
        await fetchSizes();
        let checkBoxOrientations = await fetchOrientations();

        const isEditorChoice = searchParams.get('isEditorChoice') ?? defIsEditorChoice;
        const level = searchParams.get('level') ?? defLevel;
        const sizeIndex = searchParams.get('sizeIndex') ?? defSizeIndex;
        const orientationsIds = searchParams.get('orientationsIds') ?
            searchParams.get('orientationsIds').split(searchParamSeparator) : [];

        const photoModelName = searchParams.get('photoModelName') ?? '';
        const genders = searchParams.get('genders') ? searchParams.get('genders').split(searchParamSeparator) : null
        const ethnicities = searchParams.get('ethnicities') ? searchParams.get('ethnicities').split(searchParamSeparator) : null

        const name = searchParams.get('name') ?? '';
        const creatorName = searchParams.get('creatorName') ?? '';
        const tags = searchParams.get('tags') ? searchParams.get('tags').split(searchParamSeparator) : [];

        setIsEditorChoice(isEditorChoice == 'true' ? true : false);

        setLevel(level);
        setLevelsList(levelsList);

        setSizeIndex(sizeIndex);
        setCheckBoxOrientations(changeCheckBoxList(orientationsIds, checkBoxOrientations, false));

        setPhotoModelName(photoModelName);
        setCheckBoxGenders(changeCheckBoxList(genders, checkBoxGenders));
        setCheckBoxEthnicities(changeCheckBoxList(ethnicities, checkBoxEthnicities));

        setSearchByName(name);
        setSearchByAuthorName(creatorName);
        setTags(tags)

        setIsInitialized(true);
    });

    useEffect(() => {
        fetchInitData();
    }, [])


    useEffect(() => {
        if(isOpen && isInitialized) {
            let createdAtRangeParam = null;
            let photoModelAgeRangeParam = null;

            if(fromCreatedAt != defaultValues.createdAtRange[0] ||
                toCreatedAt != defaultValues.createdAtRange[1]) {
                createdAtRangeParam = [
                    moment(fromCreatedAt).format('DD-MM-yyyy'),
                    moment(toCreatedAt).format('DD-MM-yyyy'),
                ].join(searchParamSeparator);
            }
            if(photoModelAgeRange[0] != defaultValues.photoModelAgeRange[0]
            && photoModelAgeRange[1] != defaultValues.photoModelAgeRange[1]) {
                photoModelAgeRangeParam = debouncedPhotoModelAgeRange.join(searchParamSeparator)
            }

            const data = {
                isModelExist: isModelExist === defIsModelExist ? null : isModelExist,
                level: level === defLevel ? null : level,
                orientationsIds: checkBoxOrientations.filter(e => e.checked)
                    .map(e => e.id).join(searchParamSeparator),
                sizeIndex: sizeIndex === defSizeIndex ? null : sizeIndex,
                isEditorChoice: isEditorChoice === defIsEditorChoice ? null : isEditorChoice,
                createdAtRange: createdAtRangeParam,
                name: debouncedSearchByName,
                creatorName: debouncedSearchByAuthorName,
                tags: debouncedTags.join(','),
                photoModelName: debouncedPhotoModelName,
                photoModelAgeRange: photoModelAgeRangeParam,
                genders: checkBoxGenders.filter(e => e.checked).map(e => e.name).join(searchParamSeparator),
                ethnicities: checkBoxEthnicities.filter(e => e.checked).map(e => e.name).join(searchParamSeparator),
            };
            onFilterChange(data, isReset);
            if(isReset) setIsReset(false);
        }
    }, [
        isEditorChoice,
        level,
        checkBoxOrientations,
        sizeIndex,
        fromCreatedAt,
        toCreatedAt,

        isModelExist,

        debouncedSearchByName,
        debouncedSearchByAuthorName,
        debouncedTags,

        debouncedPhotoModelName,
        debouncedPhotoModelAgeRange,
        checkBoxGenders,
        checkBoxEthnicities,

    ]);

    const resetToDefault = () => {
        setIsEditorChoice(false);
        setLevel(defLevel);
        setCheckBoxOrientations(checkBoxOrientations.map((e) => { e.checked = false; return e; }))
        setSizeIndex(defSizeIndex);
        setFromCreatedAt(defaultValues.createdAtRange[0]);
        setToCreatedAt(defaultValues.createdAtRange[1]);

        setSearchByName('');
        setSearchByAuthorName('');
        setTags([]);

        setIsModelExist(null);
        setPhotoModelName('');
        setPhotoModelAgeRange(defaultValues.photoModelAgeRange);
        setCheckBoxGenders(checkBoxGenders.map((e) => { e.checked = false; return e; }))
        setCheckBoxEthnicities(checkBoxEthnicities.map((e) => { e.checked = false; return e; }))

        setIsReset(true);
    }


    return (
        <FilterWrapper isOpen={isOpen}>
            <FilterTop>
                <ResetBtn variant='contained' onClick={resetToDefault}>
                    Reset
                </ResetBtn>

                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            checked={isEditorChoice}
                            onChange={(e, value) =>
                                setIsEditorChoice(value)}
                        />}
                        label="Editor Choice"

                    />
                </FormGroup>

               <Button onClick={onClose}>
                   <Close />
               </Button>
            </FilterTop>

            {
                isLoading ?
                    <CircularProgress /> :
                    <FilterContentGrid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            {/*<CheckBoxPicker*/}
                            {/*    title='Access Levels'*/}
                            {/*    checkBoxList={checkBoxLevels}*/}
                            {/*    setCheckBoxList={setCheckBoxLevels}*/}
                            {/*/>*/}
                            <FilterSectionLayout title='Levels'>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        1 - any,<br/> 2 - only free,<br/> 3 - only paid
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={level}
                                        onChange={(e) =>
                                            setLevel(e.target.value)}
                                    >
                                        {
                                            levelsList.map((value) =>
                                                <FormControlLabel
                                                    key={value}
                                                    value={value}
                                                    // checked={level === value}
                                                    control={<Radio />}
                                                    label={value}

                                                />
                                            )
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </FilterSectionLayout>

                            <FilterSectionLayout title='Sizes'>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">

                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={sizeIndex}
                                        onChange={(e) =>
                                            setSizeIndex(e.target.value)}
                                    >
                                        {
                                            sizeList.map((value, index) =>
                                                <FormControlLabel
                                                    key={index}
                                                    value={index}
                                                    control={<Radio />}
                                                    label={value}
                                                />
                                            )
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </FilterSectionLayout>


                            <CheckBoxPicker
                                title='Orientation'
                                checkBoxList={checkBoxOrientations}
                                setCheckBoxList={setCheckBoxOrientations}
                            />

                            <DateRange
                                name='created at'
                                title='Image created at data range'
                                range={[fromCreatedAt, toCreatedAt]}
                                onFromChange={value => setFromCreatedAt(value)}
                                onToChange={value => setToCreatedAt(value)}
                            />

                        </Grid>

                        <Grid item md={4} xs={12}>
                            <FilterSectionLayout title='Model'>
                                <Stack spacing={1} >
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        options={[]}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Model Name" />
                                        }
                                        value={photoModelName}
                                        onInputChange={(e, value) => {
                                            setPhotoModelName(value)
                                        }}

                                    />
                                </Stack>

                                <Divider sx={{ my: 2}} />

                                <Typography id="non-linear-slider" gutterBottom>
                                    Age: ${photoModelAgeRange[0]} | ${photoModelAgeRange[1]}
                                </Typography>

                                <Slider
                                    min={defaultValues && defaultValues.photoModelAgeRange[0]}
                                    max={defaultValues && defaultValues.photoModelAgeRange[1]}
                                    value={photoModelAgeRange}
                                    onChange={(e, data) => {
                                        if (!Array.isArray(data)) {
                                            return;
                                        }
                                        setPhotoModelAgeRange(data)
                                    }}
                                />

                                <Divider sx={{ my: 2}} />

                                <CheckBoxPicker
                                    title='Gender'
                                    checkBoxList={checkBoxGenders}
                                    setCheckBoxList={setCheckBoxGenders}
                                />

                                <CheckBoxPicker
                                    title='Ethnicity'
                                    checkBoxList={checkBoxEthnicities}
                                    setCheckBoxList={setCheckBoxEthnicities}
                                />


                            </FilterSectionLayout>


                        </Grid>

                        <Grid item md={4} xs={12}>
                            <FilterSectionLayout title='Search Zone'>
                                <Stack spacing={1}>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        options={[]}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Search by Image Title" />
                                        }
                                        value={searchByName}
                                        onInputChange={(e, value) => {
                                            setSearchByName(value)
                                        }}
                                    />
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <Stack spacing={1}>
                                    <Autocomplete
                                        fullWidth
                                        id="free-solo-demo"
                                        freeSolo
                                        options={[]}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Search by Author Name" />
                                        }
                                        value={searchByAuthorName}
                                        onInputChange={(e, value) => {
                                            setSearchByAuthorName(value)
                                        }}

                                    />
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <Autocomplete
                                    fullWidth
                                    multiple
                                    id="tags-filled"
                                    options={[]}
                                    defaultValue={[]}
                                    value={tags}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="outlined"
                                                  key={index}
                                                  label={option}
                                                  {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            label="Project Tags"
                                            placeholder="Favorites"
                                        />)}
                                    onChange={(event,
                                               value,
                                               reason,
                                               details) => {
                                        setTags(value);
                                    }}
                                />
                            </FilterSectionLayout>
                        </Grid>
                    </FilterContentGrid>
            }
        </FilterWrapper>
    );
};

export default GalleryFilter;