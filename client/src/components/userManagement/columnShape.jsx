

import {H6, Small, Tiny} from "../../assets/typography";
import UkoAvatar from "../UI/UkoAvatar";
import {FlexBox} from "../../assets/shared/styles";

const UserListColumnShape = [
  {
    Header: "Name",
    accessor: "name",
    minWidth: 200,
    Cell: ({ row }) => {
      const { avatar, name, address } = row.original;
      return (
        <FlexBox alignItems="center">
          <UkoAvatar src={avatar} />
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{name}</H6>
            <Tiny color="text.disabled">{address}</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Role",
    accessor: "role",
    minWidth: 200,
    Cell: ({ value }) => (
      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: "#A798FF",
        }}
      >
        {value}
      </Small>
    ),
  },
  {
    Header: "Company",
    accessor: "company",
    minWidth: 150,
  },
  {
    Header: "Project",
    accessor: "project",
    minWidth: 150,
  },
  {
    Header: "Verified",
    accessor: "verified",
    minWidth: 100,
    maxWidth: 100,
  },
];

export default UserListColumnShape;
