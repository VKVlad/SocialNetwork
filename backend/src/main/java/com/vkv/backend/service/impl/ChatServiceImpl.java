package com.vkv.backend.service.impl;

import com.vkv.backend.model.Chat;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.ChatRepository;
import com.vkv.backend.service.ChatService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    ChatRepository chatRepository;
    @Override
    public Chat createChat(User reqUser, User user2) {
        Chat isExist = chatRepository.findChatByUsersId(reqUser, user2);
        if(isExist != null) {
            return isExist;
        }
        Chat chat = new Chat();
        chat.getUsers().add(user2);
        chat.getUsers().add(reqUser);
        chat.setTimestamp(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> chat = chatRepository.findById(chatId);
        if(chat.isEmpty()) {
            throw new Exception("chat not found with id: " + chatId);
        }
        return chat.get();
    }

    @Override
    public List<Chat> findAllChatByUserId(Integer userId) {
        return chatRepository.findByUsersId(userId);
    }
}
