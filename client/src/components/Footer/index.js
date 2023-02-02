import React from 'react';
// import LogoImage from "../../assets/images/logo-full.png";
import {ReactComponent as FacebookIcon} from "../../assets/images/facebook-icon.svg";
import {ReactComponent as TwitterIcon} from "../../assets/images/twitter-icon.svg";
import {ReactComponent as YoutubeIcon} from "../../assets/images/youtube-icon.svg";
import LogoImage from '../../assets/images/custom/small_logo_main.png';
import {
    Column,
    ColumnHeading,
    CompanyAddress,
    CompanyColumn,
    CompanyInfo, Container,
    Content,
    CopyrightAndCompanyInfoRow,
    CopyrightNotice,
    FiveColumns,
    Link,
    LinkList,
    LinkListItem,
    LogoContainer, LogoImg,
    LogoText,
    SocialLink,
    SocialLinksContainer
} from "./styled";
import Divider from "@mui/material/Divider";


const Footer = () => {
    return (
        <Container>
            <Content>
                <FiveColumns>
                    <CompanyColumn>
                        <LogoContainer>
                            <LogoImg src={LogoImage} />
                            <LogoText>PhotoBankHub.Inc</LogoText>
                        </LogoContainer>
                        <CompanyAddress>
                            123 Road, New Startup Building
                            Carter Road, San Francisco
                            California 40234
                        </CompanyAddress>
                        <SocialLinksContainer>
                            <SocialLink href="https://facebook.com">
                                <FacebookIcon />
                            </SocialLink>
                            <SocialLink href="https://twitter.com">
                                <TwitterIcon />
                            </SocialLink>
                            <SocialLink href="https://youtube.com">
                                <YoutubeIcon />
                            </SocialLink>
                        </SocialLinksContainer>
                    </CompanyColumn>
                    <Column>
                        <ColumnHeading>Quick Links</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="#">Blog</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">FAQs</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Support</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">About Us</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Product</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="#">Log In</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Personal</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Business</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Team</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Legal</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="#">GDPR</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Privacy Policy</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Terms of Service</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Disclaimer</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Contact</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                +1 (234) (567)-8901
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="mailto:support@servana.com">support@servana.com</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Sales</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="#">Report Abuse</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                </FiveColumns>
                <Divider/>
                <CopyrightAndCompanyInfoRow>
                    <CopyrightNotice>&copy; Copyright 2020, PhotoBankHub Inc.</CopyrightNotice>
                    <CompanyInfo>An Internet Company.</CompanyInfo>
                </CopyrightAndCompanyInfoRow>
            </Content>
        </Container>
    );
};

export default Footer;