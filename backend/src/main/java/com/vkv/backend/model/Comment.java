package com.vkv.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String content;
    @ManyToOne
    private User user;
    @ManyToMany
    private Set<User> liked = new HashSet<>();
    private LocalDateTime createdAt;

    public void likeComment(User user) {
        liked.add(user);
    }
    public void unlikeComment(User user) {
        liked.remove(user);
    }
}
