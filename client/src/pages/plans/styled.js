import tw from "twin.macro";
import {SectionHeading, Subheading as SubheadingBase} from "../../assets/shared/Headings";
import {SectionDescription} from "../../assets/typography/Typography";
import styled from "styled-components";
import {css} from "styled-components/macro";
import {PrimaryButton as PrimaryButtonBase} from "../../assets/shared/Buttons";
import {ReactComponent as SvgDecoratorBlob1} from "../../assets/images/svg-decorator-blob-6.svg";
import {ReactComponent as SvgDecoratorBlob2} from "../../assets/images/svg-decorator-blob-7.svg";

const HeaderContainer = tw.div`w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center text-black`;

const PlanDurationSwitcher = tw.div`block w-full max-w-xs sm:inline-block
 sm:w-auto border-2 rounded-full px-1 py-1 mt-8`;
const SwitchButton = styled.button`
  ${tw`w-1/2 sm:w-32 px-4 sm:px-8 py-3 rounded-full  
  focus:outline-none text-sm font-bold 
  text-gray-700 transition duration-300`}
  ${props => props.active && tw`bg-sky-500 text-gray-100`} 
`;

const PlansContainer = tw.div`flex justify-start items-start px-10 flex-row relative flex-wrap`;
const Plan = styled.div` 
  ${tw`mt-16 mx-2 md:last:mr-0 text-center px-8 
  rounded-lg relative text-gray-900 bg-white flex flex-col shadow-red-50
  drop-shadow-xl grow xl:last:max-w-sm 
  `}

  ${props =>
    props.featured && 
    css`
      ${tw`border-2 border-gray-200 shadow-none`}
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col leading-relaxed py-8 -mx-8 bg-gray-100 rounded-t-lg`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }
  .slash {
    ${tw`text-xl text-gray-500`}
  }
  .duration {
    ${tw`lowercase text-gray-500 font-medium tracking-widest`}
  }
  .mainFeature {
    ${tw`text-gray-500 text-sm font-medium tracking-wide`}
  }
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 flex-1 text-sm`}
  .feature {
    ${tw`mt-5 first:mt-0 font-semibold text-gray-500`}
  }
`;

const PlanAction = tw.div`px-4 pb-8`;
const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`rounded-full tracking-wider py-4 w-full text-sm hover:shadow-xl 
  transform focus:translate-x-px focus:-translate-y-px focus:outline`}
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-2/3 -translate-y-1/2`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-25 transform 
  translate-x-2/3 translate-y-1/2 fill-current text-teal-300`}
`;

const Divider = tw.div`my-8 border-b-2 border-gray-800`

const P = tw.div`font-bold text-sm text-amber-700`;


export {
    HeaderContainer,
    Subheading,
    Heading,
    Description,
    PlanDurationSwitcher,
    SwitchButton,
    PlansContainer,
    Plan,
    PlanHeader,
    PlanFeatures,
    PlanAction,
    BuyNowButton,
    DecoratorBlob1,
    DecoratorBlob2,
    Divider,
    P
}