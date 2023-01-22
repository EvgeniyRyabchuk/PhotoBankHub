import { Favorite, MoreVert, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  IconButton,
  InputBase,
  styled,
  useTheme,
} from "@mui/material";
import {FlexBox} from "../../assets/shared/styles";
import {H5, H6, Small, Tiny} from "../../assets/typography";
import CommentIcon from "../../assets/icons/CommentIcon";
import UploadIcon from "../../assets/icons/UploadIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import {getAvatar, getPreview} from "../../utills/axios";
import {NavLink} from "react-router-dom";
import moment from "moment";


// component props interface
// interface PostCardProps {
//   post: {
//     postTitle: string;
//     postImage: string;
//   };
//   handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
// }

// styled components
const ImageWrapper = styled(Box)(() => ({
  width: 48,
  height: 48,
  overflow: "hidden",
  borderRadius: "50%",
}));

const PostImageWrapper = styled(Box)(() => ({
  width: "100%",
  marginTop: 16,
  overflow: "hidden",
  borderRadius: "8px",
}));

const PostCard = ({ post, handleMore }) => {
  const theme = useTheme();
  return (
    <Card sx={{ padding: 2, mb: 3 }}>
      <NavLink to={`/creators/${post.creator.id}`}>
        <FlexBox justifyContent="space-between">
          <FlexBox alignItems="center">
            <ImageWrapper>
              <img
                  src={getAvatar(post.creator.user)}
                  alt="User"
                  width="100%"
                  height="100%"
              />
            </ImageWrapper>

            <Box marginLeft={1}>
              <H5 lineHeight={1}>{post.creator.user.full_name}</H5>
              <Tiny fontWeight={500} color="text.disabled">
                { moment(post.created_at).format('MM/DD/YYYY') }
              </Tiny>
            </Box>
          </FlexBox>

          <IconButton onClick={handleMore}>
            <MoreVert fontSize="small" color="disabled" />
          </IconButton>
        </FlexBox>
      </NavLink>

      <Box marginTop={3}>
        <Small fontWeight={600}>{post.name}</Small>

        {post.preview && (
            <NavLink to={`/images/${post.id}`}>
              <PostImageWrapper>
                <img src={getPreview(post.preview)} alt="Post One" width="100%" />
              </PostImageWrapper>
            </NavLink>
        )}

        <FlexBox alignItems="center" justifyContent="space-between" my={2}>
          {postDetails.map(({ Icon, count, name }, index) => (
            <ButtonBase disableRipple key={index}>
              <FlexBox alignItems="center">
                <Icon fontSize="small" color="disabled" />
                <H6 color="text.disabled" ml={1}>
                  {name === 'favorite' ? post.likes_count : count}
                </H6>
              </FlexBox>
            </ButtonBase>
          ))}
        </FlexBox>

        <FlexBox alignItems="center" py={1}>
          <Avatar
            alt="User"
            src="/static/user/user-10.png"
            sx={{ width: 36, height: 36 }}
          />

          <InputBase
            placeholder="Write a comment"
            sx={{
              height: 36,
              paddingX: 2,
              fontSize: 13,
              width: "100%",
              marginLeft: 1,
              fontWeight: 600,
              borderRadius: "8px",
              color: "text.primary",
              backgroundColor:
                theme.palette.mode === "light" ? "secondary.200" : "divider",
            }}
          />

          <IconButton>
            <Send fontSize="large" color="disabled" />
          </IconButton>
        </FlexBox>
      </Box>
    </Card>
  );
};

const postDetails = [
  {
    name: 'favorite',
    Icon: Favorite,
    count: 150,
  },
  {
    name: 'comment',
    Icon: CommentIcon,
    count: 15,
  },
  {
    name: 'upload',
    Icon: UploadIcon,
    count: 15,
  },
  {
    name: 'share',
    Icon: ShareIcon,
    count: 12,
  },
];

export default PostCard;
