import React, {useEffect, useState} from 'react';
import {Subheading} from "../../assets/shared/components/Headings.js";
import {Container, ContentWithPaddingXl} from "../../assets/shared/components/Layouts.js";
import {Box, CircularProgress} from "@mui/material";
import {
    BuyNowButton,
    DecoratorBlob1,
    DecoratorBlob2,
    Description, Divider,
    HeaderContainer,
    Heading, P,
    Plan,
    PlanAction,
    PlanDurationSwitcher,
    PlanFeatures,
    PlanHeader,
    PlansContainer,
    SwitchButton
} from "./styled";
import {useFetching} from "../../hooks/useFetching";
import PlanService from "../../services/PlansService";
import {PageLoader, PageLoaderElement} from "../../components/Loadable";

// const defaultPlans = [
//     {
//         name: "Free Plan",
//         durationPrices: ["$0", "$0"],
//         mainFeature: "For Personal Blogs",
//         features: ["30 Templates", "7 Landing Pages", "12 Internal Pages", "Basic Assistance"],
//         multiplicator: 1,
//     },
//     {
//         name: "Pro Plan",
//         durationPrices: ["$49", "$499"],
//         mainFeature: "Suited for Production Websites",
//         features: ["60 Templates", "8 Landing Pages", "22 Internal Pages", "Priority Assistance", "Lifetime Updates"],
//         featured: true,
//         multiplicator: 12,
//     }
// ];


const Plans = ({
   subheading = "Pricing",
   heading = "Flexible Plans.",
   description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
   primaryButtonText = "Buy Now",

}) => {

    const planDurations = [
        {
            text: "Month",
            switcherText: "Monthly",
            multiplicator: 1,
        },
        {
            text: "Year",
            switcherText: "Yearly",
            multiplicator: 12,
        }
    ]

    const [plans, setPlans] = useState([]);

    const [fetching, isLoading, error] = useFetching(async () => {
        const response = await PlanService.getPlans();
        setPlans(response.data);
    });

    useEffect(() => {
        fetching();
    }, [])


    const [activeDurationIndex, setActiveDurationIndex] = useState(0);

    return (
        <Box sx={{ margin: '0 auto'}}>
            { isLoading ?
                <PageLoaderElement /> :
                <Container>
                    <ContentWithPaddingXl>
                        <HeaderContainer>
                            {subheading && <Subheading>{subheading}</Subheading>}
                            <Heading>{heading}</Heading>
                            {description && <Description>{description}</Description>}
                            <PlanDurationSwitcher>
                                {planDurations.map((planDuration, index) => (
                                    <SwitchButton active={activeDurationIndex === index}
                                                  key={index}
                                                  onClick={() => setActiveDurationIndex(index)}>
                                        {planDuration.switcherText}
                                    </SwitchButton>
                                ))}
                            </PlanDurationSwitcher>
                        </HeaderContainer>
                        <PlansContainer>
                            {plans.map((plan) => (
                                <Plan key={plan.id} featured={plan.featured} style={{ minWidth: '200px'}}>
                                    <PlanHeader>
                                    <span className="priceAndDuration">
                                      <span className="price">
                                          {plan.amount * planDurations[activeDurationIndex].multiplicator}
                                      </span>
                                      <span className="slash"> / </span>
                                      <span className="duration">
                                          {planDurations[activeDurationIndex].text}
                                      </span>
                                    </span>
                                        <span className="name">{plan.name}</span>
                                        <span className="mainFeature">{plan.description}</span>
                                    </PlanHeader>
                                    <br/>
                                    <P>Features:</P>
                                    <PlanFeatures>
                                        {plan.plan_features.map((feature) => (
                                            <span key={feature.id} className="feature">
                                                {feature.name}
                                            </span>
                                        ))}
                                    </PlanFeatures>
                                    <Divider />
                                    <P>Licenses:</P>
                                    <PlanFeatures>
                                        {plan.licenses.map((license) => (
                                            <span key={license.id} className="feature">
                                                {license.name}
                                            </span>
                                        ))}
                                    </PlanFeatures>
                                    <PlanAction>
                                        <BuyNowButton>{primaryButtonText}</BuyNowButton>
                                    </PlanAction>
                                </Plan>
                            ))}
                        </PlansContainer>
                    </ContentWithPaddingXl>
                    <DecoratorBlob1 />
                    <DecoratorBlob2 />
                </Container>
            }



        </Box>
    );
};

export default Plans;