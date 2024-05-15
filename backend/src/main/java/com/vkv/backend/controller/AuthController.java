package com.vkv.backend.controller;

import com.vkv.backend.config.CustomUserDetailsService;
import com.vkv.backend.config.JwtProvider;
import com.vkv.backend.model.User;
import com.vkv.backend.repository.UserRepository;
import com.vkv.backend.request.LoginRequest;
import com.vkv.backend.response.AuthResponse;
import com.vkv.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    CustomUserDetailsService customUserDetailsService;
    @PostMapping("/signup")
    public User createUser(@RequestBody User user) throws Exception {
        return userService.registerUser(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        if (!userDetails.isEnabled()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not verified");
        }

        String token = JwtProvider.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(token, "Login Success"));
    }

    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token") String token) {
        ResponseEntity<?> responseEntity = userService.confirmUser(token);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.status(HttpStatus.FOUND).header("Location", "http://localhost:3000/login").build();
        } else {
            return responseEntity;
        }
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        if(userDetails == null) {
            throw new BadCredentialsException("invalid username");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("Successfully logged out", HttpStatus.OK);
    }
}
