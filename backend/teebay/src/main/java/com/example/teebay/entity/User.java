package com.yourcompany.teebay.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter 
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