import React, {useEffect, useState, useRef, useMemo} from 'react';
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
import {FilterContentGrid, FilterTop, FilterWrapper, ResetBtn, BadgeWrapper} from "./styled";
import ImageService from "../../services/ImageService";
import DateRange from "./FilterSections/DateRange";
import CheckBoxPicker from "./FilterSections/CheckBoxPicker";
import {useFetching} from "../../hooks/useFetching";
import {useParams, useSearchParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import {Autocomplete} from "@mui/lab";
import FilterSectionLayout from "./FilterSections/FilterSectionLayout";
import useDebounce from "../../hooks/useDebounce";
import {Close} from "@mui/icons-material";
import PhotoModelService from "../../services/PhotoModelService";
import {
    defIsEditorChoice,
    defIsModelExist,
    defLevel,
    defPeopleCount,
    defSizeIndex,
    searchParamSeparator
} from "../../utills/const";
import zIndex from "@mui/material/styles/zIndex";
import {useSelector} from "react-redux";
import CategoryService from "../../services/CategoryService";
import Badge from './FilterSections/Badge';
import useLoadParam from "../../hooks/useLoadParam";

const GalleryFilter = ({
     isOpen,
     onFilterChange,
     onClose
}) => {
        console.log("Filter")
    const loadParam = useLoadParam();
    const [searchParams, setSearchParams] = useSearchParams();
    const [defaultValues, setDefaultValues] = useState(null);

    const { categories } = useSelector(state => state.general);
    const [checkBoxCategories, setCheckBoxCategories] = useState([]);

    const [levelsList, setLevelsList] = useState([]);
    const [level, setLevel] = useState(defLevel);

    const [checkBoxOrientations, setCheckBoxOrientations] = useState([]);

    const [sizeIndex, setSizeIndex] = useState(defSizeIndex);
    const [sizeList, setSizeList] = useState([]);

    const [fromCreatedAt, setFromCreatedAt] = useState(new Date(1970, 1, 1));
    const [toCreatedAt, setToCreatedAt] = useState(new Date());

    // image name
    const [searchByName, setSearchByName] = useState('');
    const debouncedSearchByName = useDebounce(searchByName, 1000);

    // creator name
    const [searchByAuthorName, setSearchByAuthorName] = useState('');
    const debouncedSearchByAuthorName = useDebounce(searchByAuthorName, 1000);

    // image tags
    const [tags, setTags] = useState([]);
    const debouncedTags = useDebounce(tags, 1000);

    const [peopleCount, setPeopleCount] = useState(defPeopleCount);
    const debouncedPeopleCount = useDebounce(peopleCount, 1000);
//  useState(loadParam("peopleCount", defPeopleCount, true));
    const [peopleCountRange, setPeopleCountRange] = useState(null)
    const [peopleCountMarks, setPeopleCountMarks] = useState([
        {
            value: 0,
            label: '0',
        }
    ]);

    // model name
    const [photoModelName, setPhotoModelName] = useState('');
    const debouncedPhotoModelName = useDebounce(photoModelName, 1000);

    // model age
    const [photoModelAgeRange, setPhotoModelAgeRange] = useState([1, 100]);
    const debouncedPhotoModelAgeRange = useDebounce(photoModelAgeRange, 500);

    // genders and ethnicities of photo model
    const [checkBoxGenders, setCheckBoxGenders] = useState([]);
    const [checkBoxEthnicities, setCheckBoxEthnicities] = useState([]);

    console.log(checkBoxGenders, '=================');
    

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
                 new Date(data.createdAt[1]),
            ],
            selectedLevels: [],
            photoModelAgeRange: data.photoModelAgeRange,
            peopleCountRange: data.peopleCountRange
        };

        setDefaultValues(newDefaultValue)

        // setPeopleCount(newDefaultValue.peopleCountRange[0]);
        setPeopleCountRange(newDefaultValue.peopleCountRange);
        setPeopleCountMarks(data.peopleCountMarks.map(e => ({ value: e, label: e }) ));


        const searchCreatedAtRange = searchParams.get('createdAtRange') &&
            searchParams.get('createdAtRange').split(searchParamSeparator);
        const searchPhotoModelAgeRange = searchParams.get('photoModelAgeRange') &&
            searchParams.get('photoModelAgeRange').split(searchParamSeparator);

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
        return createCheckBoxList(response.data, 'ethnicities');
    }
    const fetchSizes = async () => {
        const response = await ImageService.getSizes();
        setSizeList([...response.data]);
    }
    const fetchOrientations = async () => {
        const response = await ImageService.getOrientations();
        const fotmatted = response.data.map(o => ({
            id: o.id,
            name: `${o.name} (${o.ratio_side_1}:${o.ratio_side_2})`,
        }));
        return createCheckBoxList(fotmatted, 'orientations', false);
    }


    const fetchSiblingCategoriesCheckBoxList = async () => {
        const searchCategoriesIds = searchParams.get('categoriesIds');
        if(searchCategoriesIds) {
            const categoriesIds = searchCategoriesIds.split(searchParamSeparator, searchCategoriesIds);
            const firstCategoryId = categoriesIds[0];
            const { data: siblings } = await CategoryService.getSiblings(firstCategoryId);
            let checkBoxCategories = createCheckBoxList(siblings,'categoriesIds', false);
            setCheckBoxCategories(checkBoxCategories);
        }
    }

    const categoriesIds = searchParams.get('categoriesIds');
    useEffect(() => {
        if(isInitialized)
            fetchSiblingCategoriesCheckBoxList();
    }, [categoriesIds, isInitialized]);


    const [ fetchInitData, isLoading, error ] = useFetching(async () => {
        await fetchImageMinMax();
        const levelsList = await fetchLevels();
        let checkBoxGenders = await fetchGenders();
        let checkBoxEthnicities = await fetchEthnicities();
        await fetchSizes();
        let checkBoxOrientations = await fetchOrientations();

        await fetchSiblingCategoriesCheckBoxList();

        const isEditorChoice = searchParams.get('isEditorChoice') ?? defIsEditorChoice;
        const level = searchParams.get('level') ?? defLevel;
        const sizeIndex = searchParams.get('sizeIndex') ?? defSizeIndex;
        const peopleCount = searchParams.get('peopleCount') ?? defPeopleCount;
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
        setPeopleCount(peopleCount);
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
   
    
    const prevDataRef = useRef(null);
    const [badges, setBadges] = useState([])
    const [isFilterClick, setIsFilterClick] = useState(false); 
    const [isFirstLoad, setIsFirstLoad] = useState(true); 
    
    useEffect(() => {
        if(isInitialized) {
            let createdAtRangeParam = null;
            let photoModelAgeRangeParam = null;
console.log(fromCreatedAt, typeof fromCreatedAt);
console.log(defaultValues.createdAtRange);
            
if (
    !moment(fromCreatedAt).isSame(defaultValues.createdAtRange[0], 'day') ||
    !moment(toCreatedAt).isSame(defaultValues.createdAtRange[1], 'day')
) {
    createdAtRangeParam = [
        moment(fromCreatedAt).format('YYYY-MM-DD'),
        moment(toCreatedAt).format('YYYY-MM-DD'),
    ].join(searchParamSeparator);
}
            
            if(photoModelAgeRange[0] != defaultValues.photoModelAgeRange[0]
            || photoModelAgeRange[1] != defaultValues.photoModelAgeRange[1]) {
                photoModelAgeRangeParam = photoModelAgeRange.join(searchParamSeparator)
            }

            const data = {
                categoriesIds: checkBoxCategories.filter(e => e.checked).map(e => e.id).join(searchParamSeparator),
                isModelExist: isModelExist === defIsModelExist ? null : isModelExist,
                level: level === defLevel ? null : level,
                orientationsIds: checkBoxOrientations.filter(e => e.checked)
                    .map(e => e.id).join(searchParamSeparator),
                sizeIndex: sizeIndex === defSizeIndex ? null : sizeIndex,
                isEditorChoice: isEditorChoice === defIsEditorChoice ? null : isEditorChoice,
                createdAtRange: createdAtRangeParam,
                name: searchByName,
                creatorName: searchByAuthorName,
                tags: tags.join(','),
                photoModelName: photoModelName,
                photoModelAgeRange: photoModelAgeRangeParam,
                genders: checkBoxGenders.filter(e => e.checked).map(e => e.name).join(searchParamSeparator),
                ethnicities: checkBoxEthnicities.filter(e => e.checked).map(e => e.name).join(searchParamSeparator),
                peopleCount: peopleCount === defPeopleCount ? null : peopleCount,
            };
            console.log(data, "====================================================="); 
            const stringifiedData = JSON.stringify(data);
            
           // If the filter data has NOT actually changed, do not call onFilterChange!
            if (prevDataRef.current === stringifiedData) { 
                return; 
            }
            prevDataRef.current = stringifiedData;
   
            setBadges(
                [
                    {   
                        name: "categoriesIds",
                        label: "Category",
                        value: data.categoriesIds === "" ? null : 
                            checkBoxCategories.filter(e => e.checked).map(e => e.name).join(searchParamSeparator),                                                               
                        onRemove: () => setCheckBoxCategories(prev => prev.map(e => ({ ...e, checked: false })))   
                    },
                    {   
                        name: "isModelExist",
                        label: "Model Included",
                        value: data.isModelExist === defIsModelExist ? null : data.isModelExist,                   
                        onRemove: () => setIsModelExist(defIsModelExist)   
                    },
                    {   
                        name: "level",
                        label: "Level",
                        value: data.level === defLevel ? null : data.level,              
                        onRemove: () => setLevel(defLevel)   
                    },
                    {   
                        name: "orientationsIds",
                        label: "Orientation",
                        value: data.orientationsIds === "" ? null : 
                        checkBoxOrientations.filter(e => e.checked).map(e => e.name).join(searchParamSeparator),    
                        onRemove: () => setCheckBoxOrientations(prev => prev.map(e => ({ ...e, checked: false })))  
                    },
                    {   
                        name: "sizeIndex",
                        label: "Size",
                        value: data.sizeIndex === defSizeIndex ? null : data.sizeIndex,          
                        onRemove: () => setSizeIndex(defSizeIndex)  
                    },
                    {   
                        name: "isEditorChoice",
                        label: "Editor's Choice",
                        value: data.isEditorChoice === defIsEditorChoice ? null : data.isEditorChoice,     
                        onRemove: () => setIsEditorChoice(defIsEditorChoice)   
                    },
                    {   
                        name: "createdAtRange",
                        label: "Created Date",
                        value: data.createdAtRange,     
                        onRemove: () => {
                            setFromCreatedAt(defaultValues.createdAtRange[0]); 
                            setToCreatedAt(defaultValues.createdAtRange[1]); 
                        }   
                    },
                    {   
                        name: "name",
                        label: "Name",
                        value: data.name === "" ? null : data.name,               
                        onRemove: () => setSearchByName('')   
                    },
                    {   
                        name: "creatorName",
                        label: "Author",
                        value: data.creatorName === "" ? null : data.creatorName,        
                        onRemove: () => setSearchByAuthorName('')   
                    },
                    {   
                        name: "tags",
                        label: "Tags",
                        value: data.tags === "" ? null : data.tags.split(searchParamSeparator).map(t => `#${t}`).join(searchParamSeparator),               
                        onRemove: () => setTags([])   
                    },
                    {   
                        name: "photoModelName",
                        label: "Model Name",
                        value: data.photoModelName === "" ? null : data.photoModelName,     
                        onRemove: () => setPhotoModelName('')   
                    },
                    {   
                        name: "photoModelAgeRange",
                        label: "Model Age",
                        value: data.photoModelAgeRange === defaultValues.photoModelAgeRange.join(searchParamSeparator) ? null : data.photoModelAgeRange, 
                        onRemove: () => setPhotoModelAgeRange(defaultValues.photoModelAgeRange) 
                    },
                    {   
                        name: "genders",
                        label: "Gender",
                        value: data.genders === "" ? null : data.genders,            
                        onRemove: () => setCheckBoxGenders(prev => prev.map(e => ({ ...e, checked: false })))   
                    },
                    {   
                        name: "ethnicities",
                        label: "Ethnicity",
                        value: data.ethnicities === "" ? null : data.ethnicities,        
                        onRemove: () => setCheckBoxEthnicities(prev => prev.map(e => ({ ...e, checked: false })))   
                    },
                    {   
                        name: "peopleCount",
                        label: "People Count",
                        value: data.peopleCount === defPeopleCount ? null : data.peopleCount, 
                        onRemove: () => setPeopleCount(defPeopleCount) 
                    }, 
                ].filter(badge => badge.value !== null && badge.value !== undefined && badge.value !== "")
            );
  
            onFilterChange(data, isReset, isFirstLoad); 
            if(isReset) setIsReset(false);
            // if(isFilterClick) setIsReset(false);
            setIsFirstLoad(false); 
        }
    }, [
        checkBoxCategories,
        isEditorChoice,
        level,
        checkBoxOrientations,
        sizeIndex,
        debouncedPeopleCount,
        fromCreatedAt,
        toCreatedAt,

        isModelExist,

        debouncedSearchByName,
        debouncedSearchByAuthorName,
        debouncedTags, //

        debouncedPhotoModelName,
        debouncedPhotoModelAgeRange, // 
        checkBoxGenders,
        checkBoxEthnicities,
        searchParams

    ]);
    console.log(defaultValues, "def val");
    
    const resetToDefault = () => {
        setIsEditorChoice(false);
        setLevel(defLevel);
        setCheckBoxOrientations(checkBoxOrientations.map((e) => { e.checked = false; return e; }))
        setSizeIndex(defSizeIndex);
        setPeopleCount(defPeopleCount);
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

    console.log(fromCreatedAt);
    console.log(toCreatedAt); 
    
    

    return (
        <FilterWrapper isOpen={isOpen} onClick={() => setIsFilterClick(true)}>
            <FilterTop>
        
                <ResetBtn variant='contained' onClick={resetToDefault}>
                    Reset
                </ResetBtn>
                <BadgeWrapper>
                    {/* Removable Tag */}
                    {badges.map(badge => 
                        <Badge variant="default" removable onRemove={badge.onRemove}>{badge.label}: {badge.value}</Badge>
                    )}
                </BadgeWrapper>
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
                                        onChange={(e) => {
                                            setSizeIndex(e.target.value)}
                                        }
                                    >
                                        {
                                            sizeList.map((value, index) => {
                                              return (
                                                  <FormControlLabel
                                                      key={index}
                                                      value={index}
                                                      control={<Radio />}
                                                      label={value}
                                                />)
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </FilterSectionLayout>

                            <CheckBoxPicker
                                title='Orientation'
                                checkBoxList={checkBoxOrientations}
                                setCheckBoxList={setCheckBoxOrientations}
                            />


                            { peopleCountRange !== null &&
                                <FilterSectionLayout title='People Count'>
                                    <Slider
                                        aria-label="People Count"
                                        defaultValue={peopleCount}
                                        // valueLabelFormat={valueLabelFormat}
                                        // getAriaValueText={valuetext}
                                        step={null}
                                        valueLabelDisplay="on"
                                        marks={peopleCountMarks}
                                        min={peopleCountRange[0]}
                                        max={peopleCountRange[1]}
                                        onChange={(e, newValue) =>
                                            setPeopleCount(newValue)
                                        }
                                    />
                                </FilterSectionLayout>
                            }


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
                                    Age: {photoModelAgeRange[0]} | {photoModelAgeRange[1]}
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
                            
                            { checkBoxCategories && checkBoxCategories.length > 0 &&
                               <CheckBoxPicker
                                    title='Categories'
                                    checkBoxList={checkBoxCategories}
                                    setCheckBoxList={setCheckBoxCategories}
                                />  
                            }
                         
                        </Grid>
                    </FilterContentGrid>
            }
        </FilterWrapper>
    );
};

export default GalleryFilter;