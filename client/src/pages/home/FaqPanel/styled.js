import { motion } from "framer-motion";
import tw from "twin.macro";
import styled, { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "../../../assets/shared/components/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "../../../assets/shared/components/Headings.js";
import { SectionDescription } from "../../../assets/typography/index";

const PrimaryBackgroundContainer = tw(Container)`-mx-8 px-8 bg-sky-600 text-gray-100`;

const HeadingContainer = tw.div``;
const Subheading = tw(SubheadingBase)`text-center text-gray-100 mb-4`;
const Heading = tw(SectionHeading)``;
const Description = tw(SectionDescription)`mx-auto text-center text-gray-300`;

const FaqsContainer = tw.div`mt-10 sm:mt-16 w-full flex-1 lg:flex justify-between items-start max-w-screen-lg mx-auto`;
const FaqsColumn = tw.div`w-full lg:max-w-lg lg:mr-12 last:mr-0`;
const Faq = tw.div`select-none cursor-pointer border-b-2 border-sky-300 hover:border-sky-500 transition-colors duration-300 py-6`;
const Question = tw.div`flex justify-between items-center`;
const QuestionText = tw.div`text-sm sm:text-lg font-semibold tracking-wide`;
const QuestionToggleIcon = styled(motion.span)`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const Answer = tw(motion.div)`hidden text-sm font-normal mt-4 text-gray-300`;


export {
  PrimaryBackgroundContainer,
  HeadingContainer,
  Subheading,
  Heading,
  Description,
  FaqsContainer,
  FaqsColumn,
  Faq,
  Question,
  QuestionText,
  QuestionToggleIcon,
  Answer
}