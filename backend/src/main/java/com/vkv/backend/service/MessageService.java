package com.vkv.backend.service;

import com.vkv.backend.model.Chat;
import com.vkv.backend.model.Message;
import com.vkv.backend.model.User;

import java.util.List;

public interface MessageService {
    public Message createMessage(User user, Integer chatId, Message message) throws Exception;
    public List<Message> findChatsMessages(Integer chatId) throws Exception;

}
