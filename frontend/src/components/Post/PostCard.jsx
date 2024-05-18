import {
  Avatar, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem, TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  deletePostAction,
  likePostAction,
  savePostAction, sharePostAction,
} from "../../Redux/Post/post.action";
import {
  isLikedByReqUser,
  isSavedByReqUser,
} from "../../utils/checkSavedLiked";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};


const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);
  const handleShowComments = () => setShowComments(!showComments);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };

  const handleSavePost = () => {
    dispatch(savePostAction(item.id));
  };

  const [openShare, setOpenShare] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = () => {
    dispatch(sharePostAction(item.id, email));
    console.log(`Send post ${item.id} to email: ${email}`);
    setEmail("")
    handleCloseShare();
  };

  return (
    <Card className="w-full md:w-4/5 lg:w-4/5 mx-auto my-4">
      <Modal
          open={openShare}
          onClose={handleCloseShare}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
            Share Post
          </Typography>
          <Typography id="modal-modal-description" sx={{ display: 'flex', justifyContent: 'center' }}>
            Enter the email address to send this post:
          </Typography>
          <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              sx={{ mt: 2, mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendEmail}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
      <CardHeader
        avatar={
          <Link to={`/profile/${item.user.id}`}>
            <Avatar src={item.user.avatarUrl} />
          </Link>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link to={`/profile/${item.user.id}`}>
            {item.user?.firstName + " " + item.user?.lastName}
          </Link>
        }
        subheader={
          <Link to={`/profile/${item.user.id}`}>
            {"@" + item.user?.username}
          </Link>
        }
      />
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(deletePostAction(item.id));
            window.location.reload();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {item.image ? (
        <img src={item.image} alt="Item Image" className="" />
      ) : item.video ? (
        <div className="flex justify-center items-center h-full">
          <video
            className="max-w-full max-h-full"
            width="320"
            height="240"
            controls
            autoPlay
            loop
            muted
          >
            <source src={item.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <span>No image or video available</span>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between " disableSpacing>
        <div>
          <IconButton aria-label="add to favorites" onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton aria-label="comment" onClick={handleShowComments}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleOpenShare}>
            <SendIcon/>
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="save" onClick={handleSavePost}>
            {isSavedByReqUser(auth.user.id, item) ? (
              <TurnedInIcon />
            ) : (
              <TurnedInNotIcon />
            )}
          </IconButton>
        </div>
      </CardActions>
      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleCreateComment(e.target.value);
                  console.log("pressed", e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="write your comment..."
              type="text"
            />
          </div>
          <Divider />

          <div className="mx-3 space-y-2 my-5 text-xs">
            {item.comments?.map((comment) => (
              <div className="flex items-center space-x-5">
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                >
                  {comment.user.firstName[0]}
                </Avatar>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
