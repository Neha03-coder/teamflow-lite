package com.example.task_management.controller;

import com.example.task_management.dto.TaskRequest;
import com.example.task_management.entity.Task;
import com.example.task_management.repository.TaskRepository;
import com.example.task_management.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<Task> createTask(
            @RequestBody TaskRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(taskService.createTask(request, email));
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(
            @RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(taskService.getTasksByStatus(status));
        }
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}