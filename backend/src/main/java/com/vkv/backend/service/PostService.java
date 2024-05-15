package com.vkv.backend.service;

import com.vkv.backend.model.Post;
import com.vkv.backend.model.User;

import java.util.List;

public interface PostService {
    Post createNewPost(Post post, Integer userId) throws Exception;
    String deletePost(Integer postId, Integer userId) throws Exception;
    List<Post> findPostByUserId(Integer userId);

    List<Post> findPostBySaves(User user);

    Post findPostById(Integer postId) throws Exception;
    List<Post> findAllPost();
    Post savedPost(Integer postId, Integer userId) throws Exception;
    Post likePost(Integer postId, Integer userId) throws Exception;

}
