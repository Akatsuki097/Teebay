package com.example.teebay.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.teebay.entity.User;
import com.example.teebay.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository repo) {
        this.userRepository = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Here 'username' is really the email or whatever unique field you use
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        // Use Spring’s User for simplicity; you can map roles/authorities here
        return org.springframework.security.core.userdetails.User
                   .withUsername(user.getEmail())
                   .password(user.getPassword())
                   .authorities("USER") // or map real roles
                   .build();
    }
}