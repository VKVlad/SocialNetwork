package com.vkv.backend.service.impl;

import com.vkv.backend.model.Chat;
import com.vkv.backend.model.Message;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.ChatRepository;
import com.vkv.backend.repository.MessageRepository;
import com.vkv.backend.service.ChatService;
import com.vkv.backend.service.MessageService;
import com.vkv.backend.utils.EncryptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    ChatService chatService;
    @Autowired
    ChatRepository chatRepository;
    @Override
    public Message createMessage(User user, Integer chatId, Message req) throws Exception {
        Chat chat = chatService.findChatById(chatId);
        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(EncryptionUtils.encrypt(req.getContent()));
        message.setImage(req.getImage());
        message.setTimestamp(LocalDateTime.now());
        chat.getMessages().add(message);
        chatRepository.save(chat);
        return messageRepository.save(message);
    }

    @Override
    public List<Message> findChatsMessages(Integer chatId) throws Exception {
        chatService.findChatById(chatId);
        List<Message> messages = messageRepository.findByChatId(chatId);
        for (Message message : messages) {
            String decryptedContent = EncryptionUtils.decrypt(message.getContent());
            message.setContent(decryptedContent);
        }
        return messages;
    }


}
