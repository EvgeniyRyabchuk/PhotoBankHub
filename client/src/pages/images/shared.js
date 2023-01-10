import {getPreview} from "../../utills/axios";


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


export {
    formattedImages,
    simpleFormattedImages,
    getImagesWithOverlay,

}
