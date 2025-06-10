package com.example.teebay.controller;


import com.example.teebay.service.UserService;
import com.example.teebay.entity.User;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;
import com.example.teebay.controller.RegisterInput;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService svc) {
        this.userService = svc;
    }

     @QueryMapping
    public List<User> allUsers() {
        List<User> users = userService.findAllUsers();
        return users != null ? users : Collections.emptyList();
    }

    @MutationMapping("register")
    public AuthPayload register(@Argument RegisterInput input) {
        User saved = userService.register(input);
        //String token = /* generate or fetch token */;
        String token = "1234";
        return new AuthPayload(token, saved);
    }

    @MutationMapping("login")
    public AuthPayload login(@Argument String email, @Argument String password) {
        return userService.login(email, password);
    }
}

