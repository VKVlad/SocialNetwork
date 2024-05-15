package com.vkv.backend.repository;

import com.vkv.backend.model.Post;
import com.vkv.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("select p from Post p where p.user.id=:userId")
    List<Post> findPostByUserId(Integer userId);

    @Query("SELECT p FROM Post p JOIN p.saves s WHERE s = :user")
    List<Post> findPostBySaves(User user);
}
