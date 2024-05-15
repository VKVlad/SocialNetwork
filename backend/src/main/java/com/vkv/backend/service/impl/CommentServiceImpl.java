package com.vkv.backend.service.impl;

import com.vkv.backend.model.Comment;
import com.vkv.backend.model.Post;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.CommentRepository;
import com.vkv.backend.repository.PostRepository;
import com.vkv.backend.service.CommentService;
import com.vkv.backend.service.PostService;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    UserService userService;
    @Autowired
    PostService postService;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);
        Comment comm = new Comment();
        comm.setContent(comment.getContent());
        comm.setCreatedAt(LocalDateTime.now());
        comm.setUser(user);
        commentRepository.save(comm);
        post.getComments().add(comm);
        postRepository.save(post);
        return comm;
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Comment comment = findCommentById(commentId);

        if(!comment.getLiked().contains(user)) {
            comment.likeComment(user);
        } else {
            comment.unlikeComment(user);
        }

        return commentRepository.save(comment);
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception {
        Optional<Comment> comm = commentRepository.findById(commentId);
        if(comm.isEmpty()) {
                throw new Exception("comment not exists");
        }
        return comm.get();
    }
}
