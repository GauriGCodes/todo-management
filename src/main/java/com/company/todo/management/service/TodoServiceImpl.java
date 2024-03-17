package com.company.todo.management.service;

import com.company.todo.management.dto.TodoDto;
import com.company.todo.management.entity.Todo;
import com.company.todo.management.repository.TodoRepository;
import com.company.todo.management.utills.TodoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoServiceImpl implements TodoService{

    private TodoRepository todoRepository;

    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository){
        this.todoRepository=todoRepository;
    }

    @Override
    public TodoDto addToDo(TodoDto todoDto) {
        Todo todo = TodoMapper.mapToToDo(todoDto);
        Todo savedToDo = this.todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(savedToDo);
    }

    @Override
    public List<TodoDto> getAllToDos() {
        List<Todo> todoDtoList =  this.todoRepository.findAll();
        List<TodoDto> todoDtos = new ArrayList<>();

        for(Todo todo:todoDtoList){
            todoDtos.add(TodoMapper.mapToTodoDto(todo));
        }

        return todoDtos;
    }

    @Override
    public TodoDto getToDoById(Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(()-> new RuntimeException("ToDo with ID: "+id+" not found "));
        return TodoMapper.mapToTodoDto(todo);
    }

    @Override
    public String deleteToDo(Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(()-> new RuntimeException("ToDo with ID: "+id+" not found "));
        this.todoRepository.delete(todo);

        return "ToDo with ID: " + id + " is deleted ";
    }

    @Override
    public TodoDto updateToDo(TodoDto todoDto) {
        Todo todo = this.todoRepository.findById(todoDto.getId()).orElseThrow(() -> new RuntimeException("Todo with ID: "+todoDto.getId()+" not found."));

        todo.setDescription(todoDto.getDescription());
        todo.setTitle(todoDto.getTitle());
        todo.setCompleted(todo.isCompleted());

        Todo updatedTodo =  this.todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(updatedTodo);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo with ID: "+id+" not found."));
        todo.setCompleted(Boolean.TRUE);

        Todo updatedTodo = this.todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(updatedTodo);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {
        Todo todo = this.todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo with ID: "+id+" not found."));
        todo.setCompleted(Boolean.FALSE);

        Todo updatedTodo = this.todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(updatedTodo);
    }
}
