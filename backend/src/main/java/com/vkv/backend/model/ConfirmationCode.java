package com.vkv.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;
import java.security.SecureRandom;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ConfirmationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String code;
    @OneToOne
    private User user;

    public ConfirmationCode(User user) {
        this.user = user;
        this.code = generateConfirmationToken();
    }

    public static String generateConfirmationToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[30];
        random.nextBytes(bytes);
        BigInteger token = new BigInteger(1, bytes);
        return token.toString(16);
    }
}
