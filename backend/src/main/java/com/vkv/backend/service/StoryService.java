package com.vkv.backend.service;

import com.vkv.backend.model.Story;
import com.vkv.backend.model.User;

import java.util.List;

public interface StoryService {
    public Story createStory(Story story, User user);
    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
