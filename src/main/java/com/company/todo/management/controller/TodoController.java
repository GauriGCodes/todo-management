package com.company.todo.management.controller;

import com.company.todo.management.dto.TodoDto;
import com.company.todo.management.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/todos/v1")
public class TodoController {

    private TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService){
        this.todoService=todoService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> addToDo(@RequestBody TodoDto todoDto){
        return new ResponseEntity<>(todoService.addToDo(todoDto), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos(){
        return new ResponseEntity<>(todoService.getAllToDos(),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getToDoById(@PathVariable(name = "id")Long id){
        return new ResponseEntity<>(todoService.getToDoById(id),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<TodoDto> updateToDo(@RequestBody TodoDto todoDto){
        return new ResponseEntity<>(todoService.updateToDo(todoDto),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TodoDto> completeToDo(@PathVariable(name = "id") Long todoId){
        return new ResponseEntity<>(todoService.completeTodo(todoId),HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/inComplete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable(name = "id") Long todoId){
        return new ResponseEntity<>(todoService.inCompleteTodo(todoId),HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable(name = "id")Long id){
        return new ResponseEntity<>(todoService.deleteToDo(id),HttpStatus.OK);
    }

}
