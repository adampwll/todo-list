package com.powell.todo_backend.repository;

import com.powell.todo_backend.model.TodoListItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends MongoRepository<TodoListItem, String> {

}
