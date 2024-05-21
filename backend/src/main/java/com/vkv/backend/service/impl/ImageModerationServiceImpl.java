package com.vkv.backend.service.impl;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import com.vkv.backend.service.ImageModerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageModerationServiceImpl implements ImageModerationService {
    private final ImageAnnotatorClient visionClient;

    @Autowired
    public ImageModerationServiceImpl(ImageAnnotatorClient visionClient) {
        this.visionClient = visionClient;
    }

    public boolean isImageSafe(byte[] imageBytes) {
        ByteString imgBytes = ByteString.copyFrom(imageBytes);

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.SAFE_SEARCH_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                .addFeatures(feat)
                .setImage(img)
                .build();
        List<AnnotateImageResponse> responses = visionClient.batchAnnotateImages(List.of(request)).getResponsesList();

        for (AnnotateImageResponse res : responses) {
            if (res.hasError()) {
                System.err.println("Error: " + res.getError().getMessage());
                return false;
            }

            SafeSearchAnnotation annotation = res.getSafeSearchAnnotation();
            if (annotation.getAdultValue() > Likelihood.POSSIBLE.getNumber()
                    || annotation.getRacyValue() > Likelihood.POSSIBLE.getNumber()) {
                return false;
            }
        }

        return true;
    }
}
