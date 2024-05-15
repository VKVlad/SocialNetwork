package com.vkv.backend.repository;

import com.vkv.backend.model.Chat;
import com.vkv.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findByUsersId(Integer userId);
    @Query("select c from Chat c where :user Member of c.users And :reqUser member of c.users")
    Chat findChatByUsersId(@Param("user") User user, @Param("reqUser") User reqUser);
}
