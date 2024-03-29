import {BusinessCenter, Mail, Place} from "@mui/icons-material";
import {Box, Button, Card, Divider, Grid, Typography} from "@mui/material";
import PostCard from "./PostCard";
import {FlexBox, FollowWrapper, IconWrapper, JustifySpaceBetween, ObserverItem} from "../../assets/shared/styles";
import {H3, H4, H6, Small} from "../../assets/typography";
import MoreOptions from "../MoreOptions";
import React, {useEffect, useMemo, useRef, useState} from "react";
import moment from "moment";
import {useFetching} from "../../hooks/useFetching";
import ClientService from "../../services/ClientService";
import {defPage} from "../../utills/const";
import {useObserver} from "../../hooks/useObserver";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getPageCount} from "../../utills/page";
import userRole from "../../auth/roles";
import OwnCreatorGallery from "./Creator/OwnCreatorGallery";


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
       counterFullWidth = false,
                   user
  }) => {
  const navigate = useNavigate();
  const { user: authUser, isAuth } = useSelector(state => state.user);
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
      const { data } = await ClientService.getSubscriptionContent(authUser.client.id, page);
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


  const details = useMemo(() => {
    if(!isAuth) return [];

    return [
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
        boldText: <a style={{ color: 'blue' }} href={user.website}>{user.website}</a>,
        smallText:  "WebSite: "
      },
      {
        Icon: BusinessCenter,
        smallText: "Created Account at: ",
        boldText: moment(user.created_at).format('DD-MM-yyyy'),
      },
    ]
  }, [isAuth])


  useObserver(lastElementRef, page < totalPage, isLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    if(isPostShow && isAuth) {
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
              {isAuth && user.about} ...
            </Small>

            <Box mt={3}>
              {details.map(({ Icon, smallText, boldText }, index) => (
                <FlexBox alignItems="center" mt={1.5} key={index}>
                  <Icon />
                  <H6 style={{ textAlign: 'left' }} marginLeft={1}>
                    <Small>{smallText}</Small> {boldText}
                  </H6>
                </FlexBox>
              ))}
            </Box>
          </Box>
        </Card>
      </Grid>

        { isPostShow && isAuth && authUser.role.name === userRole.Client &&
            <Grid item md={counterFullWidth ? 12 : 7} xs={12}>
              {posts.map((post) => (
                  <PostCard post={post} key={post.id} handleMore={handleMoreOpen} />
              ))}
              {posts.length === 0 && <Typography>Your not have subscriptions yet</Typography>}
              <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
            </Grid>
        }

        { isAuth && authUser.role.name === userRole.Creator && !counterFullWidth &&
            <Grid item md={7} xs={12}>
                  <JustifySpaceBetween sx={{ flexDirection: 'column' }}>
                    <OwnCreatorGallery preview={true} style={{ overflow: 'hidden', maxHeight: '467px'}}/>
                    <Button fullWidth variant='outlined' color={"primary"} onClick={() => navigate(`/profile?tab=4`)}>
                      Show More
                    </Button>
                  </JustifySpaceBetween>
              <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
            </Grid>
        }

       <ObserverItem ref={lastElementRef} isShow={isAuth && authUser.role.name === userRole.Client} />

    </Grid>
  );
};



export default Profile;
