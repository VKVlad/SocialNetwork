package com.vkv.backend.service;

import com.vkv.backend.model.Chat;
import com.vkv.backend.model.User;
import jdk.jshell.spi.ExecutionControl;

import java.util.List;

public interface ChatService {
    public Chat createChat(User reqUser, User user2);
    public Chat findChatById(Integer chatId) throws Exception;
    public List<Chat> findAllChatByUserId(Integer userId);

}
