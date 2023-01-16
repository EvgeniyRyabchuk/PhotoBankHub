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
import {useNavigate} from "react-router-dom";
import {CardActionTypes} from "../../store/reducers/cardReducer";
import {useDispatch, useSelector} from "react-redux";


const Plans = ({
   subheading = "Pricing",
   heading = "Flexible Plans.",
   description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
   primaryButtonText = "Buy Now",

}) => {

    const navigate = useNavigate();

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

    const { user, isAuth } = useSelector(state => state.user);

    const [plans, setPlans] = useState([]);

    const [fetching, isLoading, error] = useFetching(async () => {
        const response = await PlanService.getPlans();
        setPlans(response.data);
    });

    useEffect(() => {
        fetching();
    }, [])


    const [activeDurationIndex, setActiveDurationIndex] = useState(0);

    const planSelect = (plan) => {
        console.log(123);
        if(!isAuth)
            navigate(`/login`);
        else
            navigate(`/checkout?planId=${plan.id}&periodIndex=${activeDurationIndex}`)
    }

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
                                        <BuyNowButton
                                            onClick={() => planSelect(plan)}
                                        >
                                            {primaryButtonText}
                                        </BuyNowButton>
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