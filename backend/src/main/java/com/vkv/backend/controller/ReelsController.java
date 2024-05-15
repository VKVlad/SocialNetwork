package com.vkv.backend.controller;

import com.vkv.backend.model.Reels;
import com.vkv.backend.model.User;
import com.vkv.backend.response.ApiResponse;
import com.vkv.backend.service.ReelsService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelsController {
    @Autowired
    ReelsService reelsService;
    @Autowired
    UserService userService;

    @PostMapping("/api/reels")
    public Reels createReels(@RequestBody Reels reel, @RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwt(jwt);
        return reelsService.creatReel(reel, user);
    }
    @GetMapping("/api/reels")
    public List<Reels> findAllReels() {
        return reelsService.findAllReels();
    }
    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUsersReels(@PathVariable("userId")Integer userId) throws Exception {
        return reelsService.findUsersReels(userId);
    }
    @DeleteMapping("/api/reels/{reelId}")
    public ResponseEntity<ApiResponse> deleteReel(@RequestHeader("Authorization") String jwt, @PathVariable("reelId") Integer reelId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        String message = reelsService.deleteReel(reelId, reqUser.getId());
        ApiResponse res = new ApiResponse(message, true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
