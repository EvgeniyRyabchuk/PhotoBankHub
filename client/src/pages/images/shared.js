import {getPreview} from "../../utills/axios";
import {Grid, styled} from "@mui/material";

const simpleFormattedImages = (images) => {
    const newImages = [];
    for(let image of images) {
        const originalSize = image.image_variants.find(v => v.size.name === 'ORIGINAL');
        const imageFormatted = {
            id: image.id,
            width: originalSize.width,
            height: originalSize.height,
            src: getPreview(image.preview),
        };
        newImages.push(imageFormatted);
    };
    return newImages;
}

const formattedImages = (images) => {
    const newImages = [];
    for(let image of images) {
        const originalSize = image.image_variants.find(v => v.size.name === 'ORIGINAL');
        const imageFormatted = {
            id: image.id,
            src: getPreview(image.preview),
            width: originalSize.width,
            height: originalSize.height,
            tags: image.tags.map(t => ({value: t.name, title: t.name}) ),
            caption: `${image.name} (${image.creator.user.full_name})`,
        };
        newImages.push(imageFormatted);
    };
    return newImages;
}

const getImagesWithOverlay = (images) => {
    const forattedImageList = formattedImages(images);
    return forattedImageList.map((image) => ({
        ...image,
        customOverlay: (
            <div className="custom-overlay__caption">
                <div>{image.caption}</div>
                {image.tags &&
                    image.tags.map((t, index) => (
                        <div key={index} className="custom-overlay__tag">
                            {t.title}
                        </div>
                    ))}
            </div>
        )}));
};





const CreativeGridContainer = styled(Grid)(({ theme }) => ({
    width: '1200px',
    margin: '0 auto',

    [theme.breakpoints.down('lg') ]: {
        width: '800px',
    },
    [theme.breakpoints.down('md') ]: {
        width: '100%',
    }
}));

const RightGridContainer = styled(Grid)(({ theme }) => ({
    padding: '1rem !important',
    height: '100%',
    [theme.breakpoints.down('md') ]: {
        "& > .css-mgnt6c-MuiGrid-root>.MuiGrid-item ": {
            padding: '5px !important',
        }
    }
}));

const RightGridContent = styled(Grid)(({ theme }) => ({
    width: '100%',
    maxHeight: '680px',
    overflowY: 'auto',
    margin: '20px 0px',
    flexGrow: 1,

    [theme.breakpoints.down('md') ]: {
        maxHeight: '100%',
    }
}));

const LeftGridContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem !important'
}));




export {
    formattedImages,
    simpleFormattedImages,
    getImagesWithOverlay,

    CreativeGridContainer,
    RightGridContainer,
    RightGridContent,
    LeftGridContainer,
}
