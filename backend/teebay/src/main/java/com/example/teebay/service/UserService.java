package com.example.teebay.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.teebay.entity.User;
import com.example.teebay.repository.UserRepository;
import com.example.teebay.security.JwtTokenUtil;
import com.example.teebay.controller.AuthPayload;
import com.example.teebay.controller.RegisterInput;

import java.util.Collections;
import java.util.List;


@Service
public class UserService {
    
    private final UserRepository repo;
    // inject JWT util if you have one
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
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
        String hashed = passwordEncoder.encode(in.getPassword());
        u.setPassword(hashed);
        return repo.save(u);
    }

    public Boolean login(String email, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        User u = repo.findByEmail(email)
                     .orElseThrow(() -> new RuntimeException("No user"));
        if (!passwordEncoder.matches(password, u.getPassword())) {
            throw new RuntimeException("Bad credentials" + hashedPassword + " actual password " + u.getPassword());
        }
        return true;
        // String token = /* generate JWT for u */;
        // String emailString = u.getEmail();
        // String token = JwtTokenUtil.generateToken(emailString);
        // return new AuthPayload(token, u);
    }

}
