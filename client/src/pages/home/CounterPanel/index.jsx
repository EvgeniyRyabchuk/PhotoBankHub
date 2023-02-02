import React from 'react';

import { ContentWithPaddingXl } from "../../../assets/shared/components/Layouts";

import {Container, Description, Heading, HeadingContainer, Stat, StatKey, StatsContainer, StatValue, Subheading} from "./styled";

const CounterPanel = ({
      subheading = "",
      heading = "Over 9000 Professional Image",
      description = "Evaluate all the advantages of the stock photos, illustrations, videos and music site. We are chosen by the world's largest companies.",
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
              key: "Authors",
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