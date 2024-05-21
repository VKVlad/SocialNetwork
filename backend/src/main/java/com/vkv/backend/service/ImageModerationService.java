package com.vkv.backend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;

import java.io.FileInputStream;
import java.io.IOException;

public interface ImageModerationService {

    boolean isImageSafe(byte[] imageBytes);
}
