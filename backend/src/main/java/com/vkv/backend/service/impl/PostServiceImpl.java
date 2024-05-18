package com.vkv.backend.service.impl;

import com.vkv.backend.model.Post;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.PostRepository;
import com.vkv.backend.repository.UserRepository;
import com.vkv.backend.service.PostService;
import com.vkv.backend.service.UserService;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailService emailService;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(userService.findUserById(userId));
        postRepository.save(newPost);
        return newPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(!Objects.equals(post.getUser().getId(), user.getId())) {
            throw new Exception("you can`t delete another users post");
        }

        postRepository.delete(post);
        return "post have been deleted";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public List<Post> findPostBySaves(User user) {
        return postRepository.findPostBySaves(user);
    }

    @Override
    public Post findPostById(Integer postId) throws Exception {
        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty()) {
            throw new Exception("Post not found with id: " + postId);
        }
        return post.get();
    }



    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post postSaved = findPostById(postId);
        User user = userService.findUserById(userId);

        if(postSaved.getSaves().contains(user)) {
            postSaved.removeSavedPost(user);
        } else {
            postSaved.savePost(user);
        }

        return postRepository.save(postSaved);
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception {
        Post postLiked = findPostById(postId);
        User user = userService.findUserById(userId);

        if(postLiked.getLikes().contains(user)) {
            postLiked.unlikePost(user);
        } else {
            postLiked.likePost(user);
        }

        return postRepository.save(postLiked);
    }

    @Override
    public void sendPost(User user, Post post, String email) throws Exception {
        MimeMessage mimeMessage = emailService.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(email);
        helper.setSubject(user.getFirstName() + " " + user.getLastName() + " shared a post with you!");
        helper.setText(getHtmlContent(user, post), true);

        // Встраиваем изображение пользователя
        InputStream userAvatarStream = new URL(user.getAvatarUrl()).openStream();
        byte[] userAvatarBytes = IOUtils.toByteArray(userAvatarStream); // Используем IOUtils для чтения в массив байтов
        ByteArrayResource userAvatarResource = new ByteArrayResource(userAvatarBytes);
        helper.addInline("userAvatar", userAvatarResource, "image/jpeg");

        // Встраиваем изображение поста
        InputStream postImageStream = new URL(post.getImage()).openStream();
        byte[] postImageBytes = IOUtils.toByteArray(postImageStream); // Используем IOUtils для чтения в массив байтов
        ByteArrayResource postImageResource = new ByteArrayResource(postImageBytes);
        helper.addInline("postImage", postImageResource, "image/jpeg");

        emailService.sendMimeEmail(mimeMessage);
    }


    private String getHtmlContent(User user, Post post) {
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Shared Post</title>\n" +
                "    <style>\n" +
                "        body {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            background-color: #f4f4f4;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "        }\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 20px auto;\n" +
                "            background-color: #ffffff;\n" +
                "            padding: 20px;\n" +
                "            border-radius: 8px;\n" +
                "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                "        }\n" +
                "        .header {\n" +
                "            text-align: center;\n" +
                "            padding-bottom: 20px;\n" +
                "        }\n" +
                "        .header img {\n" +
                "            width: 50px;\n" +
                "            border-radius: 50%;\n" +
                "        }\n" +
                "        .header h2 {\n" +
                "            margin: 10px 0 0;\n" +
                "            font-size: 24px;\n" +
                "        }\n" +
                "        .post-image {\n" +
                "            width: 100%;\n" +
                "            max-height: 400px;\n" +
                "            object-fit: cover;\n" +
                "            border-radius: 8px;\n" +
                "            margin-bottom: 20px;\n" +
                "        }\n" +
                "        .post-content {\n" +
                "            font-size: 16px;\n" +
                "            line-height: 1.6;\n" +
                "            color: #333333;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            text-align: center;\n" +
                "            margin-top: 20px;\n" +
                "        }\n" +
                "        .footer a {\n" +
                "            text-decoration: none;\n" +
                "            color: #ffffff;\n" +
                "            background-color: #007BFF;\n" +
                "            padding: 10px 20px;\n" +
                "            border-radius: 4px;\n" +
                "            display: inline-block;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <div class=\"header\">\n" +
                "            <img src=\"cid:userAvatar\" alt=\"User Avatar\">\n" +
                "            <h2>" + user.getFirstName() + " " + user.getLastName() + " shared a post with you!</h2>\n" +
                "        </div>\n" +
                "        <img src=\"cid:postImage\" alt=\"Post Image\" class=\"post-image\">\n" +
                "        <div class=\"post-content\">\n" +
                "            <p>" + post.getCaption() + "</p>\n" +
                "        </div>\n" +
                "        <div class=\"footer\">\n" +
                "            <a href=\"http://localhost:3000/profile/"+ post.getUser().getId() + "\">View More Posts</a>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
