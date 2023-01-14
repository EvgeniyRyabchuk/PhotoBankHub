import React from 'react';
import {FlexBox} from "../../../assets/shared/styles";
import {Box, useTheme} from "@mui/material";
import {H1, Paragraph} from "../../../assets/typography";
import {NavLink, useNavigate} from "react-router-dom";

const _404NotFound = () => {
    const theme = useTheme();
    const navigate = useNavigate();


    return (
        <FlexBox
            p={4}
            height="100%"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <Box maxWidth={350}>
                <img src="/static/illustration/error-page.svg"
                    width="100%"
                    alt="Error 404"
                />
            </Box>
            <H1 fontSize={64} fontWeight={700} color="primary.main" mt={3}>
                Ooops... 404!
            </H1>
            <Paragraph color="text.disabled" fontWeight="500">
                The page you requested could not be found.
            </Paragraph>

            <NavLink
                onClick={() => navigate(-1)}
                style={{
                    display: "block",
                    marginTop: "1.5rem",
                    fontWeight: 600,
                    textDecoration: "underline",
                    color: theme.palette.primary.main,
                }}
            >
                Back to Prev Page
            </NavLink>
        </FlexBox>
    );
};

export default _404NotFound;