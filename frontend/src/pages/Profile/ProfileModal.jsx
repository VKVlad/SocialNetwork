import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  IconButton, Snackbar, SnackbarContent,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UploadToCloud } from "../../utils/uploadToCloud";
import EditIcon from "@mui/icons-material/Edit";

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

export default function ProfileModal({ open, handleClose }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [selectedAvatar, setSelectedAvatar] = useState(auth.user.avatarUrl);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(
    auth.user.profilePictureUrl
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const enqueueSnackbar = (message, options) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSubmit = (values) => {
    dispatch(updateProfileAction(values));
    console.log("edit-------", values);
    handleClose();
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      firstName: auth.user.firstName,
      lastName: auth.user.lastName,
      username: auth.user.username,
      description: auth.user.description,
      avatarUrl: auth.user.avatarUrl,
      profilePictureUrl: auth.user.profilePictureUrl,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectAvatar = async (event) => {
    setIsLoading(true);
    const imageUrl = await UploadToCloud(event.target.files[0], 'image', enqueueSnackbar);
    if (imageUrl) {
      setSelectedAvatar(imageUrl);
      await formik.setFieldValue('avatarUrl', imageUrl);
    }
    setIsLoading(false);
  };

  const handleSelectProfilePicture = async (event) => {
    setIsLoading(true);
    const imageUrl = await UploadToCloud(event.target.files[0], 'image', enqueueSnackbar);
    if (imageUrl) {
      setSelectedProfilePicture(imageUrl);
      await formik.setFieldValue('selectedProfilePicture', imageUrl);
    }
    setIsLoading(false);
  };

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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem] relative">
                <label
                  htmlFor="profile-picture"
                  className="absolute top-0 right-0 cursor-pointer"
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelectProfilePicture}
                  style={{
                    display: "block",
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  id="image-input"
                />
                <img
                  className="w-full h-full rounded-t-md"
                  src={selectedProfilePicture}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="pl-5">
                <label htmlFor="avatar-input" style={{ cursor: "pointer" }}>
                  <Avatar
                    className="transform -translate-y-24"
                    sx={{ width: "10rem", height: "10rem" }}
                    src={selectedAvatar}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectAvatar}
                    style={{
                      display: "none",
                    }}
                    id="avatar-input"
                  />
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
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
}
