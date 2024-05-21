import * as nsfwjs from 'nsfwjs';
import '@tensorflow/tfjs';
import React, { useState } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const cloud_name = "dbb1stbmp";
const upload_preset = "orjkpus0";

export const UploadToCloud = async (pics, fileType, enqueueSnackbar) => {
  if (!pics || !fileType) {
    console.error("Invalid input: pics or fileType is missing.");
    return;
  }

  if (fileType === 'image') {
    console.log("Loading NSFWJS model...");
    const model = await nsfwjs.load();

    console.log("Checking image for NSFW content...");
    const isSafeImage = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = async () => {
          const predictions = await model.classify(img);
          console.log("Predictions:", predictions);

          // Define safe classes
          const safeClasses = ['Neutral', 'Drawing', 'Safe'];
          const threshold = 0.01; // Set a threshold for NSFW content

          // Check if all predictions are in the safe classes or below the threshold
          const isSafe = predictions.every(pred =>
              safeClasses.includes(pred.className) || pred.probability < threshold
          );
          resolve(isSafe);
        };

        img.onerror = () => {
          console.error("Image load error");
          reject(new Error("Image load error"));
        };
      };

      reader.onerror = () => {
        console.error("File reader error");
        reject(new Error("File reader error"));
      };

      reader.readAsDataURL(pics);
    });

    if (!isSafeImage) {
      enqueueSnackbar('The image contains NSFW content and cannot be uploaded.', { variant: 'warning' });
      console.warn('The image contains NSFW content and cannot be uploaded.');
      return null;
    }
  }

  console.log("File is safe. Proceeding with upload...");
  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "post",
        body: data,
      }
  );

  if (!res.ok) {
    console.error(`Cloudinary upload failed with status: ${res.status}`);
    throw new Error(`Cloudinary upload failed with status: ${res.status}`);
  }

  const fileData = await res.json();
  console.log("Upload successful. File data:", fileData);
  return fileData.url;
};