package com.powell.todo_backend.controller;

import com.powell.todo_backend.model.TodoListItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
    @GetMapping("/todos/")
    public TodoListItem getTodos() {
        return new TodoListItem(3, "test", false);
    }
}
