package com.company.todo.management.service;

import com.company.todo.management.dto.TodoDto;
import java.util.List;

public interface TodoService{
    TodoDto addToDo(TodoDto todoDto);
    List<TodoDto> getAllToDos();
    TodoDto getToDoById(Long id);
    String deleteToDo(Long id);
    TodoDto updateToDo(TodoDto todoDto);
    TodoDto completeTodo(Long id);
    TodoDto inCompleteTodo(Long id);
}
