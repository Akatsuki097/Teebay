package com.example.teebay.controller;

import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

import com.example.teebay.security.JwtTokenUtil;
import com.example.teebay.service.UserService;
import com.example.teebay.entity.User;
import com.example.teebay.repository.UserRepository;

@Controller
public class AuthController {

    
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public AuthController(UserRepository userRepository,
                          UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @MutationMapping("register")
    public AuthPayload register(@Argument RegisterInput input) {
        User saved = userService.register(input);
        //String token = /* generate or fetch token */;
        String token = jwtTokenUtil.generateToken(saved.getEmail());
        return new AuthPayload(token, saved);
    }

    @MutationMapping("login")
    public AuthPayload login(@Argument String email, @Argument String password) {
        if(userService.login(email, password)){
            User u = userService.findByEmail(email);
            String token = jwtTokenUtil.generateToken(email);
            return new AuthPayload(token, u);
        }else{
            return new AuthPayload("failed",new User());
        }
    }

}
