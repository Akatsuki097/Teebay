package com.example.teebay.controller;

import org.springframework.graphql.data.method.annotation.MutationMapping;
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

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenUtil jwtTokenUtil,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @MutationMapping("register")
    public AuthPayload register(@Argument RegisterInput input) {
        User saved = userService.register(input);
        //String token = /* generate or fetch token */;
        String token = jwtTokenUtil.generateToken(saved.getEmail());
        return new AuthPayload(token, saved);
    }

    // // Register mutation (hash password before saving)
    // @MutationMapping
    // public String register(@Argument String email, @Argument String password) {
    //     User u = new User();
    //     u.setEmail(email);
    //     u.setPassword(passwordEncoder.encode(password)); // ← hash password
    //     userRepository.save(u);
    //     return "User registered";
    // }

    // Login mutation: authenticate + return JWT
    @MutationMapping("login")
    public String login(@Argument String email, @Argument String password) {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        // On success, auth.getPrincipal() is our UserDetails
        String username = auth.getName();
        return jwtTokenUtil.generateToken(username);
    }

    // @MutationMapping("login")
    // public AuthPayload login(@Argument String email, @Argument String password) {
    //     return userService.login(email, password);
    // }

}
