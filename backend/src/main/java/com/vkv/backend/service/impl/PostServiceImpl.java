package com.vkv.backend.service.impl;

import com.vkv.backend.model.Post;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.PostRepository;
import com.vkv.backend.repository.UserRepository;
import com.vkv.backend.service.PostService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(userService.findUserById(userId));
        postRepository.save(newPost);
        return newPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(!Objects.equals(post.getUser().getId(), user.getId())) {
            throw new Exception("you can`t delete another users post");
        }

        postRepository.delete(post);
        return "post have been deleted";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public List<Post> findPostBySaves(User user) {
        return postRepository.findPostBySaves(user);
    }

    @Override
    public Post findPostById(Integer postId) throws Exception {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty()) {
            throw new Exception("Post not found with id: " + postId);
        }
        return post.get();
    }



    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post postSaved = findPostById(postId);
        User user = userService.findUserById(userId);

        if(postSaved.getSaves().contains(user)) {
            postSaved.removeSavedPost(user);
        } else {
            postSaved.savePost(user);
        }

        return postRepository.save(postSaved);
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception {
        Post postLiked = findPostById(postId);
        User user = userService.findUserById(userId);

        if(postLiked.getLikes().contains(user)) {
            postLiked.unlikePost(user);
        } else {
            postLiked.likePost(user);
        }

        return postRepository.save(postLiked);
    }
}
