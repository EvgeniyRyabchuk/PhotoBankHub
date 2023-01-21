import React, {useEffect, useMemo, useState} from 'react';
import CounterPanel from "./CounterPanel";
import {Actions, Container, Content, Divider, Heading, HeroContainer, OpacityOverlay} from "./styled";
import FaqPanel from "./FaqPanel";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import CategorySelector from "../../components/CategorySelector";
import {JustifyContent} from "../../assets/shared/styles";
import {useNavigate} from "react-router-dom";

const CustomDivider = ({index, length}) => {
    return(
        index < length - 1 &&
        <JustifyContent>
            <Box sx={{ background: 'gray', height: '50px', width: '60vw'}}></Box>
        </JustifyContent>
)}

const Home = () => {

    const navigate = useNavigate();

    const { categories } = useSelector(state => state.general);

    const parentless = useMemo(() => {
        return categories.filter((c => c.parent_id === null));
    }, [categories])

    const [search, setSearch] = useState('');



    const onSearchHandler = () => {
        navigate(`/images?search=${search}`);
    }

    return (
        <Box sx={{ padding: '10px 0'}}>
            <h1>Home</h1>

            <Container>
                <OpacityOverlay />
                <HeroContainer>
                    <Content>
                        <Heading>
                            Book Music & Comedy Events<br /> anywhere in New York
                        </Heading>
                        {/*<PrimaryAction>Search Events Near Me</PrimaryAction>*/}
                        <Divider />
                        <Actions>
                            <input
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') {
                                        onSearchHandler();
                                    }
                                }}
                                type="text"
                                placeholder="Input image name, tags, etc..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />
                            <button onClick={onSearchHandler}>Search</button>
                        </Actions>
                        <CounterPanel />


                    </Content>
                </HeroContainer>
            </Container>

            {parentless.map((c, index) =>
                    <>
                        <CategorySelector
                            category={c}
                            limit={6}
                        />
                        <CustomDivider length={parentless.length} index={index} />
                    </>

                )
            }

            <FaqPanel />
        </Box>
    );
};

export default Home;