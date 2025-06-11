package com.example.teebay.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
          .csrf().disable()
          .authorizeHttpRequests(auth -> auth
            // allow anonymous introspection & UI
            .requestMatchers(HttpMethod.GET, "/graphql", "/graphiql/**").permitAll()
            .requestMatchers(HttpMethod.OPTIONS, "/graphql").permitAll()
            // require auth everywhere else
            .anyRequest().authenticated()
          )
          .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}