import React, {useState} from 'react';
import {ArrowDownward} from "@mui/icons-material";
import {
    Answer, Description,
    Faq, FaqsColumn, FaqsContainer,
    HeadingContainer,
    PrimaryBackgroundContainer,
    Question,
    QuestionText,
    QuestionToggleIcon, Subheading
} from "./styled";
import {ContentWithPaddingXl} from "../../../assets/shared/components/Layouts";
import {Heading} from "../styled";


const FaqPanel = ({
        subheading = "",
        heading = "Frequently Asked Questions",
        description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        faqs = [
            {
                question: "Is lunch provided free of cost ?",
                answer:
                    "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system."
            },
            {
                question: "Do you have 2 Bedroom suites ?",
                answer:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                question: "Are Wi-Fi costs included in the price ?",
                answer:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                question: "Where can I reach you for support ?",
                answer:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                question: "What kind of SLA Guarantee do you provide ? ",
                answer:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                question: "Where are the servers located ?",
                answer:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            }
        ]
    }) => {

    const faqCol1 = [];
    const faqCol2 = [];
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = questionIndex => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };

    faqs.map((faq, index) => {
        const renderedFaq = (
            <Faq key={index} onClick={() => toggleQuestion(index)}>
                <Question>
                    <QuestionText>{faq.question}</QuestionText>
                    <QuestionToggleIcon
                        variants={{
                            collapsed: { rotate: 0 },
                            open: { rotate: -180 }
                        }}
                        initial="collapsed"
                        animate={activeQuestionIndex === index ? "open" : "collapsed"}
                        transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <ArrowDownward />
                        {/*<ChevronDownIcon />*/}
                    </QuestionToggleIcon>
                </Question>
                <Answer
                    variants={{
                        open: { opacity: 1, height: "auto", marginTop: "16px", display: "block" },
                        collapsed: { opacity: 0, height: 0, marginTop: "0px", display: "none" }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    {faq.answer}
                </Answer>
            </Faq>
        );

        if (index % 2 === 0) faqCol1.push(renderedFaq);
        else faqCol2.push(renderedFaq);

        return null;
    });
    return (
        <PrimaryBackgroundContainer>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    {subheading && <Subheading>{subheading}</Subheading>}
                    <Heading>{heading}</Heading>
                    <Description>{description}</Description>
                </HeadingContainer>
                <FaqsContainer>
                    <FaqsColumn>{faqCol1}</FaqsColumn>
                    <FaqsColumn>{faqCol2}</FaqsColumn>
                </FaqsContainer>
            </ContentWithPaddingXl>
        </PrimaryBackgroundContainer>
    );
};



export default FaqPanel;