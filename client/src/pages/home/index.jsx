import React from 'react';
import CounterPanel from "./CounterPanel";
import {Actions, Container, Content, Divider, Heading, HeroContainer, OpacityOverlay} from "./styled";


const Home = () => {

    return (
        <div style={{ padding: '10px 0'}}>
            <h1>Home</h1>

            <Container>
                <OpacityOverlay />
                <HeroContainer>
                    <Content>
                        <Heading>
                            Book Music & Comedy Events
                            <br />
                            anywhere in New York
                        </Heading>
                        {/*<PrimaryAction>Search Events Near Me</PrimaryAction>*/}
                        <Divider />
                        <Actions>
                            <input type="text" placeholder="Input image name, tags, etc..." />
                            <button>Search</button>
                        </Actions>
                        <CounterPanel />

                    </Content>
                </HeroContainer>
            </Container>

        </div>
    );
};

export default Home;