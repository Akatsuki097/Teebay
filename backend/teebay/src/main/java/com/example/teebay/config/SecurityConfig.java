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
      // 1) Disable CSRF (if you’re stateless / using JWT)
      http.csrf(csrf -> csrf.disable());

      // 2) Add your JWT filter before the username/password filter
     // http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

      // 3) Declare your authorization rules in one go
      http.authorizeHttpRequests(auth -> auth
          .requestMatchers(HttpMethod.GET,    "/graphql").permitAll()
          .requestMatchers(HttpMethod.OPTIONS,"/graphql").permitAll()
          .requestMatchers(HttpMethod.POST,   "/graphql").permitAll()
          .requestMatchers(HttpMethod.GET,  "/graphiql/**").permitAll()
          .anyRequest().permitAll()
      );

      // 4) Enable basic auth (or remove if you only use JWT)
      http.httpBasic(Customizer.withDefaults());

      // 5) Build and return the filter chain
      return http.build();
  }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // bcrypt for hashing user passwords
    }
}