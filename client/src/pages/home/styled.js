import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`relative -mt-8 bg-center bg-cover xl:h-screen md:h-full sm:h-full`}
  background-image: url("https://images.unsplash.com/photo-1536300007881-7e482242baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col pt-32 items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base 
sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow 
transition duration-300 bg-sky-500 text-gray-100 hocus:bg-sky-700 
hocus:text-gray-200 focus:outline-none focus:outline`;


const Actions = styled.div`
  min-width: 500px;
  @media (max-width: 768px) { 
    min-width: 100%;
  }
  ${tw`relative w-1/2 text-center mx-auto lg:mx-0`} 
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none 
    transition duration-300 focus:border-sky-500 hover:border-gray-500`} 
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-sky-500
     text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center 
     justify-center sm:w-40 sm:leading-none 
     focus:outline-none hover:bg-sky-900 transition duration-300`}
  }
`;

const Divider = tw.div`my-8 border-b-2 border-gray-800`

const SmallDivider = tw.div`my-2 border-b-2 border-gray-800`;

export {
    Container,
    OpacityOverlay,
    HeroContainer,
    Content,
    Heading,
    PrimaryAction,
    Actions,
    Divider,
    SmallDivider
}