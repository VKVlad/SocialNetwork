import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
  TextField, SnackbarContent, Snackbar,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import { UploadToCloud } from "../../utils/uploadToCloud";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  createPostAction,
} from "../../Redux/Post/post.action";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

const CreatePostModal = ({ handleClose, open }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const enqueueSnackbar = (message, options) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await UploadToCloud(event.target.files[0], 'image', enqueueSnackbar);
    if (imageUrl) {
      setSelectedImage(imageUrl);
      await formik.setFieldValue('image', imageUrl);
    }
    setIsLoading(false);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await UploadToCloud(event.target.files[0], 'video');
    if (videoUrl) {
      setSelectedVideo(videoUrl);
      await formik.setFieldValue('video', videoUrl);
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      console.log("values:", values);
      dispatch(createPostAction(values));
      formik.resetForm();
      setSelectedVideo("");
      setSelectedVideo("");
      handleClose();
    },
  });



  return (
      <div>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-4 items-center">
              <Avatar src={auth.user.avatarUrl} />
              <div>
                <p className="font-bold text-lg">
                  {auth.user?.firstName + " " + auth.user?.lastName}
                </p>
                <p className="text-sm">{"@" + auth.user?.username}</p>
              </div>
            </div>
            <TextField
              className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054]"
              placeholder="Write caption..."
              name="caption"
              onChange={formik.handleChange}
              value={formik.values.caption}
              rows="4"
              multiline
              fullWidth
              label="Caption"
              variant="standard"
            />

            <div className="flex space-x-5 items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>
              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input">
                  <IconButton color="primary" component="span">
                    <VideocamIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>
            {selectedImage && (
              <div>
                <img className="h-[10rem]" src={selectedImage} alt="" />
              </div>
            )}
            {selectedVideo && (
              <div>
                <video className="h-[10rem]" controls autoPlay loop muted src={selectedVideo} alt="" />
              </div>
            )}
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "1.5rem" }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
        >
          <SnackbarContent
              style={{
                backgroundColor: '#ff9800',
              }}
              message={snackbarMessage}
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
          />
        </Snackbar>
      </div>
  );
};

export default CreatePostModal;
