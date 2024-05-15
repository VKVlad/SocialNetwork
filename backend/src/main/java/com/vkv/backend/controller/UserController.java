package com.vkv.backend.controller;

import com.vkv.backend.exeption.UserException;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.UserRepository;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/api/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{userId}")
    public User getUsersById(@PathVariable("userId") Integer id) throws Exception {
        return userService.findUserById(id);
    }

    @PutMapping("/api/users")
    public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        return userService.updateUserDetails(user, reqUser.getId());
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable("userId") Integer id) throws Exception {
        return userService.deleteUser(id);
    }

    @PutMapping("/api/users/follow/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable("userId2") Integer userId2) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        return userService.followUser(reqUser.getId(), userId2);
    }

    @GetMapping("/api/users/search")
    public List<User> searchUser(@RequestParam("query") String query) throws Exception {
        return userService.searchUser(query);
    }

    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }
    @GetMapping("/api/users/recommendations")
    public List<User> getRecommendedUsers(@RequestHeader("Authorization") String jwt) throws UserException {
        User currentUser = userService.findUserByJwt(jwt);
        return userService.getRecommendedUsers(currentUser.getId());
    }
}
