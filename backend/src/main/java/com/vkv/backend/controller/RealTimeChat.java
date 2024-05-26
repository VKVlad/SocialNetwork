package com.vkv.backend.controller;

import com.vkv.backend.model.Message;
import com.vkv.backend.utils.EncryptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class RealTimeChat {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(
            @Payload Message message,
            @DestinationVariable String groupId) {
        try {
            String decryptedContent = EncryptionUtils.decrypt(message.getContent());
            message.setContent(decryptedContent);
        } catch (Exception e) {
            e.printStackTrace();
        }
        simpMessagingTemplate.convertAndSendToUser(groupId, "/private", message);
        return message;
    }
}
