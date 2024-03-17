package com.company.todo.management.utills;

import com.company.todo.management.dto.TodoDto;
import com.company.todo.management.entity.Todo;
import org.modelmapper.ModelMapper;

public class TodoMapper {
    public static Todo mapToToDo(TodoDto todoDto){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(todoDto,Todo.class);
    }

    public static TodoDto mapToTodoDto(Todo todo){
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(todo, TodoDto.class);
    }
}
