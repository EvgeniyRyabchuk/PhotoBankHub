import { BusinessCenter, Mail, Place } from "@mui/icons-material";
import { Box, Card, Divider, Grid, styled } from "@mui/material";
import PostCard from "./PostCard";
import {FlexBox, FollowWrapper, IconWrapper} from "../../assets/shared/styles";
import UserPlusIcon from "../../assets/icons/UserPlusIcon";
import {H3, H4, H6, Small} from "../../assets/typography";
import FollowerIcon from "../../assets/icons/FollowerIcon";
import MoreOptions from "../MoreOptions";
import {useState} from "react";
import moment from "moment";



const postList = [
  {
    id: 1,
    postTitle: "Coffee and Afternoon",
    postImage: "/static/post-image/post-1.png",
  },
  {
    id: 2,
    postTitle: "Coffee and Afternoon",
    postImage: "",
  },
];


const Profile = ({ user, isPostShow = true, countList = [], counterFullWidth = false }) => {
  const [moreEl, setMoreEl] = useState(null);
  const handleMoreOpen = (event) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);


  const details = [
    {
      Icon: Place,
      boldText: "Kuwait",
      smallText: "Lives at",
    },
    {
      Icon: Mail,
      boldText: user.email,
      smallText: "Email: " ,
    },
    {
      Icon: BusinessCenter,
      boldText: "Company Name: ",
      smallText: user.company_name,
    },
    {
      Icon: BusinessCenter,
      smallText: "Created Account at: ",
      boldText: moment(user.created_at).format('DD-MM-yyyy'),
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item md={isPostShow ? 5 : 12} xs={12}>
        <Card>
          <FollowWrapper fullWidth={counterFullWidth}>
            { countList.map((e, index) =>
              <FlexBox alignItems="center" sx={{ p: 1}}>
                <IconWrapper color={e.iconColor ?? ''}>
                  { e.icon }
                </IconWrapper>
                <Box marginLeft={1.5}>
                  <H6 color="text.disabled" lineHeight={1}>
                    {e.title}
                  </H6>
                  <H3 lineHeight={1} mt={0.6}>
                    {e.value}
                  </H3>
                </Box>
              </FlexBox>
            )}
          </FollowWrapper>

          <Divider />

          <Box padding={3}>
            <H4 fontWeight={600}>About</H4>
            <Small mt={1} display="block" lineHeight={1.9}>
              {user.about} ...
            </Small>

            <Box mt={3}>
              {details.map(({ Icon, smallText, boldText }, index) => (
                <FlexBox alignItems="center" mt={1.5} key={index}>
                  <Icon />
                  <H6 marginLeft={1}>
                    <Small>{smallText}</Small> {boldText}
                  </H6>
                </FlexBox>
              ))}
            </Box>
          </Box>
        </Card>
      </Grid>

      {
        isPostShow &&
          <Grid item md={7} xs={12}>
            {postList.map((post) => (
                <PostCard post={post} key={post.id} handleMore={handleMoreOpen} />
            ))}

            <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
          </Grid>
      }

    </Grid>
  );
};



export default Profile;
