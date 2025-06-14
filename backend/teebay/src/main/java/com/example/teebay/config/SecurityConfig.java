package com.example.teebay.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.teebay.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    
      http.csrf(csrf -> csrf.disable());

      http.authorizeHttpRequests(auth -> auth
          .requestMatchers(HttpMethod.GET,    "/graphql").permitAll()
          .requestMatchers(HttpMethod.OPTIONS,"/graphql").permitAll()
          .requestMatchers(HttpMethod.POST,   "/graphql").permitAll()
          .requestMatchers(HttpMethod.GET,  "/graphiql/**").permitAll()
          .anyRequest().permitAll()
      );

      http.httpBasic(Customizer.withDefaults());

      return http.build();
  }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // bcrypt for hashing user passwords
    }
}