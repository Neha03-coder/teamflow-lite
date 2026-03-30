package com.example.task_management.dto;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private String status;
    private Long assignedToId;
}