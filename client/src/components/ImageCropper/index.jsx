import React, {useState} from 'react';
// @ts-ignore
import AvatarImageCropper from "react-avatar-image-cropper";
import {Avatar, Button} from "@mui/material";
import {useSelector} from "react-redux";
import {CropContent, CropWrapper} from "./styled";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";

// interface ImageCropperProps {
//     setOpen: (open: boolean) => void,
//         onChange: (file: any, fileUrl: string) => void,
// }

const avatarStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
};

const ImageCropper = ({ setOpen, onChange, }) => {

    const { user } = useSelector(state => state.user);
    const [url, setUrl] = useState(`${API_URL_WITH_PUBLIC_STORAGE}/${user.avatar}`);

    const handleImageOnChange = async (file) => {
        // const newImage = event.target?.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUrl(url);
            onChange(file, url);
        }
    };

    return (
        <CropWrapper>
            <CropContent>
                <Avatar
                    alt={'avatar'}
                    src={url}
                    sx={avatarStyle}
                />
                <AvatarImageCropper
                    apply={(e) => handleImageOnChange(e)}
                    // icon={ <IconButton component="span">
                    //     <PhotoCamera sx={{ fontSize: 30, color: "white" }} />
                    // </IconButton>}
                />
                <Button
                    sx={{mt: 5}}
                    variant='contained'
                    onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </CropContent>
        </CropWrapper>

    );
};

export default ImageCropper;