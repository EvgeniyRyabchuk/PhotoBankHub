import {
    DragDropText,
    dragEnterStyle,
    FileMetaData, FileMetaSpan,
    FilePreviewContainer,
    FileUploadContainer,
    FormField,
    ImagePreview,
    InputLabel,
    PreviewContainer,
    PreviewList,
    RemoveFileIcon,
    UploadFileBtn
} from "./styled";
import {Upload} from "@mui/icons-material";
import {useRef, useState} from "react";

const KILO_BYTES_PER_BYTE = 1000;
const MB = 100; // megabyte
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000 * MB; // mb to bytes


const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);



const FileUploader = ({
          label,
          updateFilesCb,
          maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
          containerPadding = null,
          ...otherProps
        }) => {


    const fileInputField = useRef(null);
    const [files, setFiles] = useState([]);

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size < maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
        setFileEnter(false);
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    const [fileEnter, setFileEnter] = useState(false);

    const onDragEnter = (e) => {
        // console.log('drag enter ')
        setFileEnter(true);
    }
    const onDragLeave = (e) => {
        // console.log('drag leave')
        setFileEnter(false);
    }


    return (
        <>
            <FileUploadContainer
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragOver={onDragEnter}
                style={fileEnter ? {...dragEnterStyle, padding: containerPadding ?? 'auto'} : {
                    padding: containerPadding ?? 'auto'
                }}
            >
                <InputLabel>{label}</InputLabel>
                <DragDropText>Drag and drop your files anywhere or</DragDropText>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <Upload/>
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </FileUploadContainer>
            {
                files.length !== 0 &&
                <FilePreviewContainer>
                    <PreviewList>
                        {Object.keys(files).map((fileName, index) => {
                            let file = files[fileName];
                            let isImageFile = file.type.split("/")[0] === "image";
                            let isTxtFile = file.type.split("/")[0] === "text";
                            const fileType = file.type.split("/")[0];

                            console.log(file.type.split("/")[0])
                            return (
                                <PreviewContainer key={fileName}>
                                    <div>
                                        {fileType === "image" && (
                                            <ImagePreview
                                                src={URL.createObjectURL(file)}
                                                alt={`file preview ${index}`}
                                            />
                                        )}

                                        {fileType === "text" && (
                                            <ImagePreview
                                                src={'https://cdn-icons-png.flaticon.com/512/104/104647.png'}
                                                alt={`file preview ${index}`}
                                            />
                                        )}

                                        <FileMetaData isImageFile={isImageFile}>
                                            <FileMetaSpan>
                                                {file.name}
                                            </FileMetaSpan>
                                            <aside>
                                                <span>{convertBytesToKB(file.size)} kb</span>
                                                <RemoveFileIcon
                                                    className="fas fa-trash-alt"
                                                    onClick={() => removeFile(fileName)}
                                                />
                                            </aside>
                                        </FileMetaData>
                                    </div>
                                </PreviewContainer>
                            );
                        })}
                    </PreviewList>
                </FilePreviewContainer>
            }

        </>
    );
};

export default FileUploader;