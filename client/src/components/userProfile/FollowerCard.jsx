import { Box, Button, Card, styled, useTheme } from "@mui/material";
import {FlexBox} from "../../assets/shared/styles";
import UkoAvatar from "../UI/UkoAvatar";
import {H6, Tiny} from "../../assets/typography";
import {getAvatar} from "../../utills/axios";
import {NavLink} from "react-router-dom";
import ClientService from "../../services/ClientService";
import {useAction} from "../../hooks/useAction";
import {useSelector} from "react-redux";
import userRole from "../../auth/roles";

// component props interface
// interface FollowerCardProps {
//   follower: {
//     image: string;
//     name: string;
//     profession: string;
//     following: boolean;
//   };
// }

const StyledButton = styled(Button)(({ theme }) => ({
  width: 83,
  padding: 0,
  height: 25,
  fontSize: 10,
  fontWeight: 500,
  borderRadius: "11px",
  color: theme.palette.text.disabled,
}));

const FollowerCard = ({ follower: followTarget, isUnfollowShow = true}) => {
  const theme = useTheme();
  // button background color
  const backgroundColor =
    theme.palette.mode === "light" ? "secondary.200" : "divider";
  // button border color
  const borderColor =
    theme.palette.mode === "light" ? "secondary.200" : "divider";

  const { user: authUser} = useSelector(state => state.user);

  const { profile } = useAction();


  const subscribeHandler = async () => {
    await ClientService.contentUnSubscribe(authUser.client.id, followTarget.id);
    await profile();
  }

  return (
    <Card sx={{ padding: 3 }}>
      <FlexBox justifyContent="space-between" alignItems="center">
        <NavLink to={followTarget.user.role.name === userRole.Creator && `/creators/${followTarget.id}`}>
          <FlexBox>
            <UkoAvatar src={getAvatar(followTarget.user)}
                       sx={{ width: 42, height: 42 }} />
            <Box marginLeft={1}>
              <H6>{followTarget.user.full_name}</H6>
              <Tiny color="text.disabled" fontWeight={500}>
                Creator
              </Tiny>
            </Box>
          </FlexBox>
        </NavLink>



        {followTarget.following ? (
          <StyledButton
            sx={{
              backgroundColor,
              "&:hover": { backgroundColor },
            }}
          >
            Following
          </StyledButton>
        ) : (
            <>
              {
                  isUnfollowShow &&
                  <StyledButton
                      variant="outlined"
                      sx={{
                        borderColor,
                        "&:hover": { borderColor },
                      }}
                      onClick={subscribeHandler}
                  >
                    Unfollow
                  </StyledButton>
              }
            </>
        )}
      </FlexBox>
    </Card>
  );
};

export default FollowerCard;
