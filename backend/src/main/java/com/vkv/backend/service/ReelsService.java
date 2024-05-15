package com.vkv.backend.service;

import com.vkv.backend.model.Reels;
import com.vkv.backend.model.User;

import java.util.List;

public interface ReelsService {
    public Reels creatReel(Reels reel, User user);
    public List<Reels> findAllReels();
    public List<Reels> findUsersReels(Integer userId) throws Exception;

    String deleteReel(Integer reelId, Integer userId) throws Exception;

    Reels findReelById(Integer reelId) throws Exception;
}
