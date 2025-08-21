package com.powell.todo_backend.service;

import com.powell.todo_backend.model.TodoListItem;

import java.util.List;

public interface TodoService {

    public TodoListItem createTodo(TodoListItem todo);

    public List<TodoListItem> findAllTodos();

    public void updateTodos(TodoListItem[] todos);

    public void deleteTodo(String id);
}

