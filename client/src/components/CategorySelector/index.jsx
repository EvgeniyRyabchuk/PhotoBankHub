import React, {useMemo} from 'react';
import {Container, ContentWithPaddingXl} from "../../assets/shared/components/Layouts";
import {
    AuthorImage,
    AuthorInfo,
    AuthorName,
    AuthorProfile,
    AuthorTextInfo,
    DarkBg,
    DecoratorBlob1,
    DecoratorBlob2,
    Description,
    Heading,
    HeadingContainer,
    Post,
    PostContainer,
    PostDescription,
    PostImage,
    Posts,
    PostText,
    PostTitle,
    Subheading
} from "./styled";
import {getPreview} from "../../utills/axios";
import {NavLink, useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import {H1} from "../../assets/typography";
import {useSelector} from "react-redux";

const CategorySelector = ({
        subheading = "Category",
        description = "",
        limit = null,
        category,
}) => {

    const { categories } = useSelector(state => state.general);

    const children = useMemo(() => {
        let result = categories.filter(c => c.parent_id === category.id);
        if(limit && result.length > limit) {
            result = result.slice(0, limit);
        }
        console.log(limit, result.length)
        return result;
    }, [category]);

    const navigate = useNavigate();

    const select = (subCategory) => {
        const subCategoryChildren = categories.filter(c => c.parent_id === subCategory.id);
        const url = subCategoryChildren.length > 0 ? `/categories/${subCategory.id}` : `/images?categoryId=${subCategory.id}`;
        navigate(url);
    }

    return (
        <Container>
            <ContentWithPaddingXl>
                <HeadingContainer>
                    {subheading && <Subheading>{subheading}</Subheading>}
                    {category && <Heading>{category.name}</Heading>}
                    {description && <Description>{description}</Description>}
                </HeadingContainer>
                <Posts>
                    {children.map((subCategory) => (
                        <PostContainer featured={subCategory.featured} key={subCategory.id}>

                            <Post className="group" onClick={() => select(subCategory)}>
                                <Box sx={{ position: 'relative'}}>
                                    <DarkBg>
                                        <H1 sx={{ fontSize: '35px', paddinTop: '100px', color: 'white'}}>
                                            {subCategory.name}
                                        </H1>
                                    </DarkBg>
                                    <PostImage imageSrc={getPreview(subCategory.preview)} />
                                </Box>

                                <PostText>
                                    <PostTitle>{subCategory.name}</PostTitle>
                                    {subCategory.featured && <PostDescription>{subCategory.description}</PostDescription>}
                                    <AuthorInfo>
                                        {subCategory.featured && <AuthorImage src={subCategory.authorImageSrc} />}
                                        <AuthorTextInfo>
                                            <AuthorName>{subCategory.authorName}</AuthorName>
                                            {subCategory.featured && <AuthorProfile>{subCategory.authorProfile}</AuthorProfile>}
                                        </AuthorTextInfo>
                                    </AuthorInfo>
                                </PostText>
                            </Post>
                        </PostContainer>
                    ))}

                    <DecoratorBlob1 />
                    <DecoratorBlob2 />
                </Posts>

                <Box sx={{ mt: 5, 'a:hover': { color: 'blue' } }}>
                    <NavLink to={`/categories/${category.id}`} >
                        View More
                    </NavLink>
                </Box>

            </ContentWithPaddingXl>
        </Container>
    );
};

export default CategorySelector;