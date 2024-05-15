package com.vkv.backend.repository;

import com.vkv.backend.model.Post;
import com.vkv.backend.model.Reels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReelsRepository extends JpaRepository<Reels, Integer> {
    @Query("select r from Reels r where r.user.id=:userId")
    public List<Reels> findByUserId(Integer userId);

}
