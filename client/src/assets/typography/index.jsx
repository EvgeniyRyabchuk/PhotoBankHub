import tw from "twin.macro";
import {Box, BoxProps, Button, styled, Typography} from "@mui/material";
import clsx from "clsx";


export const SectionDescription =
    tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-100 max-w-xl`;


const StyledBox = styled(Box)(({ textTransformStyle, ellipsis }) => ({
    textTransform: textTransformStyle || "none",
    whiteSpace: ellipsis ? "nowrap" : "normal",
    overflow: ellipsis ? "hidden" : "",
    textOverflow: ellipsis ? "ellipsis" : "",
}));

// type Props = {
//         ellipsis?: boolean;
//         textTransform?:
//     | "none"
//     | "capitalize"
//     | "uppercase"
//     | "lowercase"
//     | "initial"
//     | "inherit";
// };

export const H1 = ({
   children,
   className,
   ellipsis,
   textTransform,
   ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({ [className || ""]: true })}
            component="h1"
            mb={0}
            mt={0}
            fontSize="28px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const H2 = ({
   children,
   className,
   ellipsis,
   textTransform,
   ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({ [className || ""]: true })}
            component="h2"
            mb={0}
            mt={0}
            fontSize="24px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const H3 = ({
   children,
   className,
   ellipsis,
   textTransform,
   ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({ [className || ""]: true })}
            component="h3"
            mb={0}
            mt={0}
            fontSize="18px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const H4 = ({
   children,
   className,
   ellipsis,
   textTransform,
   ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="h4"
            mb={0}
            mt={0}
            fontSize="16px"
            fontWeight="500"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const H5 = ({
   children,
   className,
   ellipsis,
   textTransform,
   ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="h5"
            mb={0}
            mt={0}
            fontSize="14px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const H6 = ({
   children,
   className,
   ellipsis,
   textTransform,
   ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="h6"
            mb={0}
            mt={0}
            fontSize="13px"
            fontWeight="600"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const Paragraph = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="p"
            mb={0}
            mt={0}
            fontSize="14px"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const Small = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="small"
            fontSize="12px"
            fontWeight="500"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const Span = ({
     children,
     className,
     ellipsis,
     textTransform,
     ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="span"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};

export const Tiny = ({
    children,
    className,
    ellipsis,
    textTransform,
    ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || ""]: true,
            })}
            component="small"
            fontSize="11px"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};



export const TextWithEllipsis = styled(Typography)(( {theme} ) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
}));