package com.vkv.backend.controller;

import com.vkv.backend.model.Message;
import com.vkv.backend.model.User;
import com.vkv.backend.service.MessageService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {
    @Autowired
    MessageService messageService;
    @Autowired
    UserService userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestBody Message req,
                                 @PathVariable Integer chatId,
                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return messageService.createMessage(user, chatId, req);
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> findChatsMessage(@PathVariable Integer chatId) throws Exception {
        return messageService.findChatsMessages(chatId);
    }
}
