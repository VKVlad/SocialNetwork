package com.vkv.backend.service.impl;

import com.vkv.backend.config.JwtProvider;
import com.vkv.backend.exeption.UserException;
import com.vkv.backend.model.ConfirmationCode;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.ConfirmationCodeRepository;
import com.vkv.backend.repository.UserRepository;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    EmailService emailService;
    @Autowired
    ConfirmationCodeRepository confirmationCodeRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public User registerUser(User user) throws Exception {
        ///Add user
        User isExists = userRepository.findUserByEmail(user.getEmail());

        if(isExists!=null) {
            throw new Exception("this email is already used with another account");
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setGender(user.getGender());
        String randomUsername = generateRandomUsername();
        newUser.setUsername(randomUsername);
        userRepository.save(newUser);

        ///Generate token and save
        ConfirmationCode confirmationToken = new ConfirmationCode(newUser);
        confirmationCodeRepository.save(confirmationToken);

        ///Create message and send
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8080/auth/confirm-account?token="+confirmationToken.getCode());
        emailService.sendEmail(mailMessage);
        ///
        System.out.println("Confirmation Token: " + confirmationToken.getCode());
        return newUser;
    }

    private String generateRandomUsername() {
        String username = UUID.randomUUID().toString().substring(0, 8);
        if(userRepository.findByUsername(username) != null) {
            generateRandomUsername();
        }
        return username;
    }

    @Override
    public User findUserById(Integer id) throws UserException {
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent()) {
            return user.get();
        }
        throw new UserException("User doesn`t exist with id:" + id);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public User followUser(Integer reqUserId, Integer followingId) throws UserException {
        User follower = userRepository.findById(reqUserId).orElse(null);
        User following = userRepository.findById(followingId).orElse(null);

        if (follower == null || following == null) {
            throw new UserException("One or both users not found");
        }

        if(follower.getFollowings().contains(following)) {
            follower.removeFollowing(following);
        } else {
            follower.addFollowing(following);
        }

        userRepository.save(follower);

        return follower;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User updateUserDetails(User updateUser, Integer userId) throws UserException {
        Optional<User> userDb = userRepository.findById(userId);
        if(userDb.isPresent()) {
            User oldUser = userDb.get();
            if(updateUser.getFirstName() != null) {
                oldUser.setFirstName(updateUser.getFirstName());
            }
            if(updateUser.getLastName() != null) {
                oldUser.setLastName(updateUser.getLastName());
            }
            if(updateUser.getUsername() != null) {
                User userByUsername = userRepository.findByUsername(updateUser.getUsername());
                if(userByUsername == null) {
                    oldUser.setUsername(updateUser.getUsername());
                }
            }
            if(updateUser.getDescription() != null) {
                oldUser.setDescription(updateUser.getDescription());
            }
            if(updateUser.getAvatarUrl() != null) {
                oldUser.setAvatarUrl(updateUser.getAvatarUrl());
            }
            if(updateUser.getProfilePictureUrl() != null) {
                oldUser.setProfilePictureUrl(updateUser.getProfilePictureUrl());
            }
            return userRepository.save(oldUser);
        }
        throw new UserException("User doesn`t exists with id: " + updateUser.getId());
    }

    @Override
    public String deleteUser(Integer userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            userRepository.delete(user.get());
            return "User has been deleted with id: " + userId;
        }
        throw new UserException("User doesn`t exists with id: " + userId);
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        return userRepository.findUserByEmail(email);
    }

    @Override
    public List<User> getRecommendedUsers(Integer userId) throws UserException {
        // Retrieve all users from the repository
        List<User> allUsers = userRepository.findAll();

        // Retrieve the current user
        User currentUser = findUserById(userId);

        // Collect subscriptions of the current user
        Set<User> subscriptions = new HashSet<>(currentUser.getFollowings());

        // Collect subscribers of the current user
        Set<User> subscribers = new HashSet<>(currentUser.getFollowers());

        // Collect subscriptions of subscriptions (subscriptions of followings)
        for (User subscription : subscriptions) {
            Set<User> subSubscriptions = subscription.getFollowings();
            subscriptions.addAll(subSubscriptions);
        }

        // Collect subscribers of subscribers (subscribers of followers)
        for (User subscriber : subscribers) {
            Set<User> subSubscribers = subscriber.getFollowers();
            subscribers.addAll(subSubscribers);
        }

        // Combine the users who are subscriptions of the current user and subscribers of the current user
        Set<User> recommendedUsersSet = new HashSet<>();
        recommendedUsersSet.addAll(subscriptions);
        recommendedUsersSet.addAll(subscribers);

        // Remove the current user and users whom the current user is already following
        recommendedUsersSet.remove(currentUser);
        recommendedUsersSet.removeAll(currentUser.getFollowings());

        // Shuffle the list to randomize the order
        List<User> recommendedUsers = new ArrayList<>(recommendedUsersSet);
        Collections.shuffle(recommendedUsers);

        // Limit the list to maximum 10 recommended users
        int maxRecommendedUsers = Math.min(recommendedUsers.size(), 10);

        // Return the first maxRecommendedUsers from the list
        return recommendedUsers.subList(0, maxRecommendedUsers);
    }

    @Override
    public ResponseEntity<String> confirmUser(String confirmationCode) {
        ConfirmationCode token = confirmationCodeRepository.findByCode(confirmationCode);

        if(token != null)
        {
            User user = userRepository.findUserByEmail(token.getUser().getEmail());
            user.setVerified(true);
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }

}
