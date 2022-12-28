import React from 'react';

import { ContentWithPaddingXl } from "../../../assets/shared/components/Layouts";

import {Container, Description, Heading, HeadingContainer, Stat, StatKey, StatsContainer, StatValue, Subheading} from "./styled";

const CounterPanel = ({
      subheading = "",
      heading = "Over 9000 Projects Completed",
      description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      stats = [
          {
              key: "Clients",
              value: "2500+",
          },
          {
              key: "Revenue",
              value: "$100M+",
          },
          {
              key: "Employees",
              value: "150+",
          },
      ]
    }) => {


    return (
        <Container>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    {subheading && <Subheading>{subheading}</Subheading>}
                    <Heading>{heading}</Heading>
                    {description && <Description>{description}</Description>}
                </HeadingContainer>
                <StatsContainer>
                    {stats.map((stat, index) => (
                        <Stat key={index}>
                            <StatValue>{stat.value}</StatValue>
                            <StatKey>{stat.key}</StatKey>
                        </Stat>
                    ))}
                </StatsContainer>
            </ContentWithPaddingXl>
        </Container>
    );
};

export default CounterPanel;