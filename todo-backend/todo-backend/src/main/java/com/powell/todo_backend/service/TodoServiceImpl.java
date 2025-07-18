package com.powell.todo_backend.service;

import com.powell.todo_backend.model.TodoListItem;
import com.powell.todo_backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<TodoListItem> findAllTodos() {
        return todoRepository.findAll();
    }

    public TodoListItem createTodo(TodoListItem todo) {
        return todoRepository.insert(todo);
    }

    public void deleteTodo(String id) {
        if(!todoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found");
        }
        todoRepository.deleteById(id);
    }
}
