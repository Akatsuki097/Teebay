package com.example.teebay.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/graphql")            // your GraphQL endpoint
      .allowedOrigins("http://localhost:3000") // allow your React dev server
      .allowedMethods("POST", "OPTIONS")       // GraphQL mostly uses POST & preflight
      .allowCredentials(true)                  // if you send cookies/auth headers
      .maxAge(3600);                           // cache preflight response for 1 hour
  }
}