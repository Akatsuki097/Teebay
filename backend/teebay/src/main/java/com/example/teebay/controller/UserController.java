package com.example.teebay.controller;


import com.example.teebay.service.UserService;
import com.example.teebay.entity.User;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.stereotype.Controller;
import com.example.teebay.controller.RegisterInput;

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

    

    
}

