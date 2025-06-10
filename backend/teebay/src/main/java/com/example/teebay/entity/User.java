package com.example.teebay.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter 
@Table(name = "\"user\"") 
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String password;

    // getters & setters...
}