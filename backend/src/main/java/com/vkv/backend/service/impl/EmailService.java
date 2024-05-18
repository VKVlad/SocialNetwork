package com.vkv.backend.service.impl;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;


@Service
public class EmailService {
    @Autowired
    public JavaMailSender mailSender;

    public void sendEmail(SimpleMailMessage mailMessage) {
        mailSender.send(mailMessage);
    }

    public MimeMessage createMimeMessage() {
        return mailSender.createMimeMessage();
    }

    public void sendMimeEmail(MimeMessage mimeMessage) {
        mailSender.send(mimeMessage);
    }
}
