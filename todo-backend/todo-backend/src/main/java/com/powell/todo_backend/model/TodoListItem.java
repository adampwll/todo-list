package com.powell.todo_backend.model;

import org.springframework.data.annotation.Id;
import java.util.Objects;

public class TodoListItem {
    @Id
    private String id;
    private String text;
    private boolean completed;

    public TodoListItem(String id, String text, boolean completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TodoListItem that = (TodoListItem) o;
        return Objects.equals(id, that.id) && completed == that.completed && Objects.equals(text, that.text);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, completed);
    }
}
