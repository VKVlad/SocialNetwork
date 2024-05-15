package com.vkv.backend.controller;

import com.vkv.backend.model.Chat;
import com.vkv.backend.model.User;
import com.vkv.backend.request.ChatRequest;
import com.vkv.backend.service.ChatService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    ChatService chatService;
    @Autowired
    UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt, @RequestBody ChatRequest req) throws Exception {
        return chatService.createChat(
                userService.findUserByJwt(jwt),
                userService.findUserById(req.getUserId2())
        );
    }
    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwt(jwt);
        return chatService.findAllChatByUserId(user.getId());
    }
}
