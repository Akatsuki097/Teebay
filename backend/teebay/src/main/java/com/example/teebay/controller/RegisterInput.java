package com.example.teebay.controller;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RegisterInput {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String password;

    public RegisterInput() {}
}
