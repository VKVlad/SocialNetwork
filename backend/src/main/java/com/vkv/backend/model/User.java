package com.vkv.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.vkv.backend.DTO.UserIdSerializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;
    @Setter
    private String username;
    private String avatarUrl;
    private String profilePictureUrl;
    private int followerCount;
    private boolean isVerified = false;
    private int followingCount;
    private String description;

    @JsonSerialize(contentUsing = UserIdSerializer.class)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_followers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private Set<User> followers = new HashSet<>();

    @JsonSerialize(contentUsing = UserIdSerializer.class)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_followings",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id"))
    private Set<User> followings = new HashSet<>();

    public void addFollowing(User following) {
        followings.add(following);
        following.getFollowers().add(this);
        updateFollowingCount(1);
        following.updateFollowerCount(1);
    }

    public void removeFollowing(User following) {
        followings.remove(following);
        following.getFollowers().remove(this);
        updateFollowingCount(-1);
        following.updateFollowerCount(-1);
    }

    public void updateFollowerCount(int delta) {
        followerCount += delta;
    }

    public void updateFollowingCount(int delta) {
        followingCount += delta;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }
}
