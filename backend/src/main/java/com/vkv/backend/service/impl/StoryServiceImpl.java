package com.vkv.backend.service.impl;

import com.vkv.backend.model.Story;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.StoryRepository;
import com.vkv.backend.service.StoryService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    StoryRepository storyRepository;
    @Autowired
    UserService userService;
    @Override
    public Story createStory(Story story, User user) {
        Story createStory = new Story();
        createStory.setCaption(story.getCaption());
        createStory.setImage(story.getImage());
        createStory.setUser(user);
        createStory.setTimestamp(LocalDateTime.now());
        return storyRepository.save(createStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {
        userService.findUserById(userId);
        return storyRepository.findByUserId(userId);
    }
}
