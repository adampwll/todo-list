package com.powell.todo_backend.controller;

import com.powell.todo_backend.model.TodoListItem;
import com.powell.todo_backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping("/todos/")
    public List<TodoListItem> getTodos() {
        return todoService.findAllTodos();
    }

    @PostMapping("/todos/")
    public TodoListItem createTodo(@RequestBody TodoListItem todo) {
        return todoService.createTodo(todo);
    }

    @DeleteMapping("/todos/")
    public void deleteTodo(@RequestBody String id) {
        todoService.deleteTodo(id);
    }
}
