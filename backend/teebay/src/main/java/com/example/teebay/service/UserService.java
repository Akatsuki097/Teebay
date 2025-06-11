package com.example.teebay.service;

import org.springframework.stereotype.Service;

import com.example.teebay.entity.User;
import com.example.teebay.repository.UserRepository;
import com.example.teebay.controller.AuthPayload;
import com.example.teebay.controller.RegisterInput;

import java.util.Collections;
import java.util.List;


@Service
public class UserService {
    
    private final UserRepository repo;
    // inject JWT util if you have one

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> findAllUsers() {
        List<User> users = repo.findAll(); // This should already return an empty list, not null
        return users != null ? users : Collections.emptyList();
    }

    public User findById(Integer id) {
        return repo.findById(id)
                   .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public User findByEmail(String userName) {
        return repo.findByEmail(userName)
                   .orElseThrow(() -> new RuntimeException("User not found with id " + userName));
    }

    public User register(RegisterInput in) {
        // 1) Optional: check repo.findByEmail(in.getEmail()) → throw if exists
        User u = new User();
        u.setFirstName(in.getFirstName());
        u.setLastName(in.getLastName());
        u.setEmail(in.getEmail());
        u.setPhone(in.getPhone());
        u.setAddress(in.getAddress());
        // remember to hash in.getPassword() in prod!
        u.setPassword(in.getPassword());
        return repo.save(u);
    }

    public AuthPayload login(String email, String password) {
        User u = repo.findByEmail(email)
                     .orElseThrow(() -> new RuntimeException("No user"));
        if (!u.getPassword().equals(password)) {
            throw new RuntimeException("Bad credentials");
        }
        //String token = /* generate JWT for u */;
        String token = "1234";
        return new AuthPayload(token, u);
    }

}
