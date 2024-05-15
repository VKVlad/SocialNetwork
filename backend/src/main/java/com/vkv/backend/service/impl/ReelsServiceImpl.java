package com.vkv.backend.service.impl;

import com.vkv.backend.model.Reels;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.ReelsRepository;
import com.vkv.backend.service.ReelsService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReelsServiceImpl implements ReelsService {
    @Autowired
    ReelsRepository reelsRepository;

    @Autowired
    UserService userService;
    @Override
    public Reels creatReel(Reels reel, User user) {
        Reels createReel = new Reels();
        createReel.setTitle(reel.getTitle());
        createReel.setVideo(reel.getVideo());
        createReel.setUser(user);
        createReel.setCreatedAt(LocalDateTime.now());
        return reelsRepository.save(createReel);
    }

    @Override
    public List<Reels> findAllReels() {
        return reelsRepository.findAll();
    }

    @Override
    public List<Reels> findUsersReels(Integer userId) throws Exception {
        userService.findUserById(userId);
        return reelsRepository.findByUserId(userId);
    }

    @Override
    public String deleteReel(Integer reelId, Integer userId) throws Exception {
        Reels reel = findReelById(reelId);
        User user = userService.findUserById(userId);

        if(!Objects.equals(reel.getUser().getId(), user.getId())) {
            throw new Exception("you can`t delete another users reel");
        }

        reelsRepository.delete(reel);
        return "reel have been deleted";
    }

    @Override
    public Reels findReelById(Integer reelId) throws Exception {
        Optional<Reels> reel = reelsRepository.findById(reelId);
        if(reel.isEmpty()) {
            throw new Exception("Post not found with id: " + reelId);
        }
        return reel.get();
    }
}
