package com.vkv.backend.DTO;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.vkv.backend.model.User;

import java.io.IOException;

public class UserIdSerializer extends StdSerializer<User> {
    public UserIdSerializer() {
        super(User.class);
    }

    @Override
    public void serialize(User user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        if (user.getId() != null) {
            jsonGenerator.writeNumberField("id", user.getId());
        } else {
            jsonGenerator.writeNullField("id");
        }
        jsonGenerator.writeStringField("firstName", user.getFirstName());
        jsonGenerator.writeStringField("lastName", user.getLastName());
        jsonGenerator.writeStringField("email", user.getEmail());
        jsonGenerator.writeStringField("gender", user.getGender());
        jsonGenerator.writeStringField("username", user.getUsername());
        jsonGenerator.writeStringField("avatarUrl", user.getAvatarUrl());
        jsonGenerator.writeStringField("profilePictureUrl", user.getProfilePictureUrl());
        jsonGenerator.writeNumberField("followerCount", user.getFollowerCount());
        jsonGenerator.writeNumberField("followingCount", user.getFollowingCount());
        jsonGenerator.writeStringField("description", user.getDescription());
        jsonGenerator.writeEndObject();
    }
}
