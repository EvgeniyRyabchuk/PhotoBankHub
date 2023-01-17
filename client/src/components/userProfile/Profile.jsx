import {BusinessCenter, Mail, Place} from "@mui/icons-material";
import {Box, Card, Divider, Grid} from "@mui/material";
import PostCard from "./PostCard";
import {FlexBox, FollowWrapper, IconWrapper, ObserverItem} from "../../assets/shared/styles";
import {H3, H4, H6, Small} from "../../assets/typography";
import MoreOptions from "../MoreOptions";
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import {useFetching} from "../../hooks/useFetching";
import ClientService from "../../services/ClientService";
import {defPage} from "../../utills/const";
import {useObserver} from "../../hooks/useObserver";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPageCount} from "../../utills/page";
import userRole from "../../auth/roles";


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


const Profile = ({
       isPostShow = true,
       countList = [],
       counterFullWidth = false
  }) => {

  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const lastElementRef = useRef();

  const [moreEl, setMoreEl] = useState(null);
  const [page, setPage] = useState(defPage);
  const [totalPage, setTotalPage] = useState(0);
  const [posts, setPosts] = useState([]);


  const handleMoreOpen = (event) => {
    setMoreEl(event.currentTarget);
  };

  const handleMoreClose = () => setMoreEl(null);

  const [fetchPosts, isLoading, error] = useFetching(async () => {
      const { data } = await ClientService.getSubscriptionContent(user.client.id, page);
      setTotalPage(getPageCount(data.total, 5));

    if(page > 1) {
      setPosts([...posts, ...data.data]);
    }
    else if(page === 1) {
      setPosts([...data.data]);
    }
    else {
      setPosts([]);
    }

  });

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
      boldText: user.website,
      smallText:  "WebSite: "
    },
    {
      Icon: BusinessCenter,
      smallText: "Created Account at: ",
      boldText: moment(user.created_at).format('DD-MM-yyyy'),
    },
  ];

  useObserver(lastElementRef, page < totalPage, isLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    if(isPostShow) {
      fetchPosts();
    }
  }, [page, isPostShow]);

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

        { isPostShow && user.role.name === userRole.Client &&
            <Grid item md={7} xs={12}>
              {posts.map((post) => (
                  <PostCard post={post} key={post.id} handleMore={handleMoreOpen} />
              ))}

              <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
            </Grid>
        }
        { user.role.name === userRole.Creator &&
            <Grid item md={7} xs={12}>
              Creator Image Gallery
              <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
            </Grid>
        }

       <ObserverItem ref={lastElementRef} isShow={isPostShow} />

    </Grid>
  );
};



export default Profile;
