import tw from "twin.macro";
import {Container as ContainerBase} from "../../../assets/shared/components/Layouts";
import {SectionHeading, Subheading as SubheadingBase} from "../../../assets/shared/components/Headings";
import {SectionDescription} from "../../../assets/typography";

const Container = tw(ContainerBase)` bg-transparent text-gray-100 rounded-3xl`;
const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)`sm:text-3xl md:text-4xl lg:text-5xl`;
const Subheading = tw(SubheadingBase)`text-gray-100 text-center`;
const Description = tw(SectionDescription)`text-gray-400 text-center mx-auto max-w-screen-md`;

const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto`
const Stat = tw.div`flex flex-col text-center p-4 tracking-wide`
const StatKey = tw.div`text-xl font-medium`
const StatValue = tw.div`text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black`


export {
    Container,
    HeadingContainer,
    Heading,
    Subheading,
    Description,
    StatsContainer,
    Stat,
    StatKey,
    StatValue,
}