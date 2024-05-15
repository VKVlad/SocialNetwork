package com.vkv.backend.service;

import com.vkv.backend.exeption.UserException;
import com.vkv.backend.model.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
     User registerUser(User user) throws Exception;
     User findUserById(Integer id) throws UserException;
     User findUserByEmail(String email) throws UserException;
     User followUser(Integer reqUserId, Integer followUserId) throws UserException;
     List<User> searchUser(String query) throws UserException;
     User updateUserDetails(User updateUser, Integer userId) throws UserException;
     String deleteUser(Integer userId) throws UserException;
     User findUserByJwt(String jwt);
     List<User> getRecommendedUsers(Integer userId) throws UserException;
     ResponseEntity<String> confirmUser(String confirmationCode);
}
