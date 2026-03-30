package com.example.task_management.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String name;
    private String email;
    private String password;
}