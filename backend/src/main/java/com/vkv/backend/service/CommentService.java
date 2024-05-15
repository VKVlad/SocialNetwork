package com.vkv.backend.service;

import com.vkv.backend.model.Comment;

public interface CommentService {
    public Comment createComment(Comment comment,
                                 Integer postId,
                                 Integer userId) throws Exception;
    public Comment likeComment(Integer commentId, Integer userId) throws Exception;
    public Comment findCommentById(Integer commentId) throws Exception;
}
