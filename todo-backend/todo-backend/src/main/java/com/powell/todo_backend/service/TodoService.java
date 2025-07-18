package com.powell.todo_backend.service;

import com.powell.todo_backend.model.TodoListItem;

import java.util.List;

public interface TodoService {
    public List<TodoListItem> findAllTodos();

    public TodoListItem createTodo(TodoListItem todo);

    public void deleteTodo(String id);
}

