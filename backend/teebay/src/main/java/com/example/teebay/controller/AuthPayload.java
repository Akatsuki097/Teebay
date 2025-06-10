package com.example.teebay.controller;

import com.example.teebay.entity.User;

public class AuthPayload {
    private String token;
    private User   user;

    public AuthPayload() {}

    public AuthPayload(String token, User user) {
        this.token = token;
        this.user  = user;
    }

    public String getToken()        { return token; }
    public void   setToken(String t){ this.token = t; }

    public User   getUser()         { return user;  }
    public void   setUser(User u)   { this.user  = u; }
}
