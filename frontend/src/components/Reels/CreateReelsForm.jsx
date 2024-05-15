import React, { useState } from "react";
import { useFormik } from "formik";
import "tailwindcss/tailwind.css";
import { uploadToCloud } from "../../utils/uploadToCloud";
import { useDispatch } from "react-redux";
import { createReelAction } from "../../Redux/Reel/reel.action";
import BackupIcon from "@mui/icons-material/Backup";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Input,
  FormControl,
  TextField,
  Typography, Snackbar,
} from "@mui/material";

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

const CreateReelsForm = ({ handleClose }) => {
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloud(event.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      video: "",
    },
    onSubmit: (values) => {
      console.log("values:", values);
      dispatch(createReelAction(values));
      formik.resetForm();
      setSelectedVideo("");
    },
  });

  return (
    <Box sx={style}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth variant="standard">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 150,
              border: "1px dashed #ccc",
              borderRadius: 5,
              cursor: "pointer",
              backgroundColor: selectedVideo ? "#f0f0f0" : "inherit",
            }}
            onClick={() => document.getElementById("video-upload").click()}
          >
            {selectedVideo ? (
              <video width="100%" height="100%" controls autoPlay loop muted src={selectedVideo} />
            ) : (
              <>
                <BackupIcon sx={{ mr: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Drag and drop or click to upload
                </Typography>
              </>
            )}
          </Box>
          <label htmlFor="video-upload" style={{ display: "none" }}>
          </label>
          <Input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleSelectVideo}
            hidden
            aria-labelledby="video-upload-label"
            style={{ display: "none" }}
          />
        </FormControl>
        <TextField
          className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054]"
          placeholder="Write caption..."
          name="title"
          id="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          rows="2"
          multiline
          fullWidth
          label="Caption"
          variant="standard"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ borderRadius: "1.5rem", mt: 3, width: "100%" }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress color="inherit" size={24} /> : "Post"}
        </Button>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Successfully posted!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default CreateReelsForm;
