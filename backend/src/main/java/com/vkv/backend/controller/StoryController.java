package com.vkv.backend.controller;

import com.vkv.backend.model.Story;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.UserRepository;
import com.vkv.backend.service.StoryService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StoryController {
    @Autowired
    StoryService storyService;
    @Autowired
    private UserService userService;

    @PostMapping("/api/story")
    public Story createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwt(jwt);
        return storyService.createStory(story, user);
    }
    @GetMapping("/api/story/user/{userId}")
    public List<Story> findUsersStory(@PathVariable Integer userId) throws Exception {
        return storyService.findStoryByUserId(userId);
    }
}
