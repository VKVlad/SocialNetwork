package com.vkv.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    private String chat_name;
    private String chat_image;
    @ManyToMany
    private List<User> users = new ArrayList<>();
    private LocalDateTime timestamp;
    @OneToMany(mappedBy = "chat")
    private List<Message> messages = new ArrayList<>();
}
