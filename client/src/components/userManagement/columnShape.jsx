

import {H6, Small, Tiny} from "../../assets/typography";
import UkoAvatar from "../UI/UkoAvatar";
import {FlexBox} from "../../assets/shared/styles";
import {getPreview} from "../../utills/axios";
import moment from "moment";
import {Button} from "@mui/material";
import {Download} from "@mui/icons-material";
import ImageService from "../../services/ImageService";
import ClientService from "../../services/ClientService";

const DownloadListColumnShape = [
  {
    Header: ({ value }) => (<div style={{ textAlign: 'center'}}>ID</div>),
    accessor: 'id',
    minWidth: 50,
    Cell: ({ value }) => (<div style={{ textAlign: 'center'}}>{value}</div>),
  },
  {
    Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Name</div>),
    accessor: "image.name",
    minWidth: 200,
    Cell: ({ row }) => {
      const { image, created_at } = row.original;
      return (
        <FlexBox alignItems="center">
          <img width={50} height={50} src={getPreview(image.preview)} />
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{image.name}</H6>
            <Tiny color="text.disabled">{image.tags.map(t => t.name).join(',')}</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Image Variant</div>),
    accessor: "image_variant",
    minWidth: 100,
    Cell: ({ value }) => (
      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: "#A798FF",
        }}
      >
        {value.size.name}
      </Small>
    ),
  },
  {
    Header: ({ value }) => (<div style={{ textAlign: 'center'}}>Download Date</div>),
    accessor: "created_at",
    minWidth: 150,
    Cell: ({ value }) => (
        <Small
            sx={{
              borderRadius: 10,
              padding: ".2rem 1rem",
              color: "background.paper",
              backgroundColor: "#B233CF",
            }}
        >
          {moment(value).format('yyyy-mm-DD')}
        </Small>
    ),
  },
  {
    Header: "Actions",
    id: "actions",
    minWidth: 100,
    maxWidth: 100,
    Cell: ({ row }) => (
        <div>
            <Button onClick={async (e) => {
                const { image_variant } = row.values;
                await ClientService.download(image_variant.image_id, image_variant.id);
            }}>
                <Download />
            </Button>
        </div>
    )
  },
];

export{
  DownloadListColumnShape
};
