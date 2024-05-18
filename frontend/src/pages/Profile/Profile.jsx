import {Avatar, Button, Card, IconButton, Typography} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getUsersPostAction, getUsersSavedPostAction } from "../../Redux/Post/post.action";
import { followUserAction, getProfileByIdAction } from "../../Redux/User/user.action";
import { isFollowedByReqUser } from "../../utils/checkSavedLiked";
import { getUsersReelsAction } from "../../Redux/Reel/reel.action";
import IosShareIcon from '@mui/icons-material/IosShare';
import Modal from "@mui/material/Modal";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" }
];

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = React.useState("post");
  const { auth, post, user, reel } = useSelector((store) => store);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isOwnProfile = (parseInt(id) === parseInt(auth.user.id));

  useEffect(()=>{
    dispatch(getUsersReelsAction(id)); 
    dispatch(getUsersSavedPostAction(id));
    dispatch(getUsersPostAction(id)); 
    dispatch(getProfileByIdAction(id));
  }, [id, post.newComment]); 

  const handleFollowUser = async () => {
    await dispatch(followUserAction(user.userProfile.id));
    dispatch(getProfileByIdAction(id));
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src={user.userProfile?.profilePictureUrl}
            alt=""
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={user.userProfile?.avatarUrl}
          />
          {isOwnProfile ? (
            <Button
              onClick={handleOpen}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
            >
              Edit Profile
            </Button>
          ) : isFollowedByReqUser(auth.user.id, user.userProfile) ? (
            <Button sx={{ borderRadius: "20px" }} variant="outlined" onClick={handleFollowUser}>Unfollow</Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined" onClick={handleFollowUser}>Follow</Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="p-1 font-bold text xl">
              {user.userProfile?.firstName + " " + user.userProfile?.lastName}
            </h1>
            <p>
              {"@" + user.userProfile?.username}
            </p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>{post.userPosts?.length} post</span>
            <span>{user.userProfile?.followerCount} followers</span>
            <span>{user.userProfile?.followingCount} followings</span>
          </div>
          <div>
            <p>
              {user.userProfile?.description}
            </p>
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item) => (
                <Tab value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {post.userPosts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reel.userReels.map((item) => (
                  <div className="flex justify-center flex-wrap gap-2 my-10">
                    <UserReelCard item={item}/>
                  </div>
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[80%] my-10">
                {post.savedPosts.map((item) => (
                  <div className="border border-slate-100 rounded-md">
                    <PostCard item={item}/>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>

  );
};

export default Profile;
